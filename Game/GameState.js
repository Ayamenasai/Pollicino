import { EnemyFactory } from './Enemy.js';
import { Pollicino } from './Pollicino.js';
import { MainUserInterface } from "./UserInterface.js";
import { ProximitySymbolFactory } from "./ProximitySymbol.js";
import { defaultTextFormat, pickupSackText, tutorialCompletedText } from "./Text.js";

let friendlyBulletsGroup, enemyGroup, groundGroup, backgroundGroup, sackGroup;
let mainUserInterface, enemyFactory, symbolFactory, pollicino;

export let GameState = {
  preload: function (game) {
    game.load.atlas(
      'pollicino',
      'Assets/Spritesheet/pollicinoAtlas.png',
      'Assets/Spritesheet/pollicinoAtlas.json'
    );
    game.load.spritesheet('ladybug', 'Assets/Spritesheet/ladybug.png', 516, 403);
    game.load.image('bee', 'Assets/Personaggi/ape.png');
    game.load.spritesheet('sindaco', 'Assets/Personaggi/sindaco.png', 138, 206);
    game.load.image('baloon', 'Assets/Personaggi/vignetta.png');
    game.load.spritesheet('background', 'Assets/Backgrounds/back1.png', 1024, 768);
    game.load.spritesheet('background1', 'Assets/Backgrounds/back2.png', 1024, 768);
    game.load.image('background2', 'Assets/Backgrounds/back2.1.png');
    game.load.image('background2.1', 'Assets/Backgrounds/backVillage.png');
    game.load.image('background3', 'Assets/Backgrounds/back3.png');
    game.load.image('transition', 'Assets/Backgrounds/transition.png');
    game.load.image('healthBar', 'Assets/Icons/Heart1.png');
    game.load.image('heart', 'Assets/Icons/Heart.png');
    game.load.image('sack', 'Assets/Icons/sack.png');
    game.load.image('frecce', 'Assets/Icons/frecce.png');
    game.load.image('E', 'Assets/Icons/E.png');
    game.load.image('X', 'Assets/Icons/X.png');
    game.load.image('inventory', 'Assets/Icons/pergamena.png');
    game.load.image('pollen', 'Assets/Icons/polline.png');
    game.load.image('star', 'Assets/Icons/star.png');
    game.load.image('fionda', 'Assets/Icons/fionda.png');
    game.load.image('ground', 'Assets/Terrain/ground.png');
    game.load.image('platform', 'Assets/Terrain/platform.png');
    game.load.image('platform1', 'Assets/Terrain/platform1.png');
    game.load.image('platform2', 'Assets/Terrain/platform2.png');
    game.load.image('bullets', 'Assets/Icons/rock.png');
  },

  create: function (game) {
    backgroundGroup = game.add.group();
    sackGroup = game.add.physicsGroup();
    friendlyBulletsGroup = game.add.group();
    groundGroup = game.add.group();
    enemyGroup = game.add.group();

    pollicino = new Pollicino(game, 100, 300, friendlyBulletsGroup);

    enemyFactory = new EnemyFactory(game, enemyGroup);
    enemyFactory.create('ladybug', 900, 30, pollicino);

    symbolFactory = new ProximitySymbolFactory(game);
    let minDistance = 150;
    symbolFactory.createSprite('frecce', 30, 290, pollicino, minDistance);
    symbolFactory.createSprite('E', 312, 250, pollicino, minDistance);
    symbolFactory.createSprite('X', 312, 250, pollicino, minDistance);

    symbolFactory.createText(pickupSackText, 410, 280, defaultTextFormat, pollicino, minDistance);
    symbolFactory.createText(tutorialCompletedText, 410, 0, defaultTextFormat, pollicino, minDistance);

    mainUserInterface = new MainUserInterface(game, pollicino);

    sackGroup.create(480, 420, 'sack');

    game.world.setBounds(0, 0, 5120, 768);

    createBackgrounds(game);
    createTerrain(game);


    vignetta = game.add.sprite(1600, 150, 'baloon');
    sindaco = game.add.sprite(1700, 210, 'sindaco');
    sindaco.animations.add('idleSindaco');
    sindaco.animations.play('idleSindaco', 3, true);
    sindacoText = game.add.text(1610, 160, '', {
      fontFamily: 'Gill Sans',
      fontSize: '22px',
      fill: '#000000'
    });
  },

  update: function (game) {
    game.physics.arcade.collide(groundGroup, pollicino.sprite);
    game.physics.arcade.collide(groundGroup, enemyGroup);

    game.physics.arcade.overlap(pollicino.sprite, sackGroup, getRocksCallback, null, { pollicino });
    game.physics.arcade.overlap(pollicino.sprite, enemyGroup, touchEnemyCallback, null, { pollicino, enemyFactory });
    game.physics.arcade.overlap(enemyGroup, friendlyBulletsGroup, hitEnemyCallback, null, { pollicino, enemyFactory });

    enemyFactory.update();
    pollicino.update();
    symbolFactory.update();
    mainUserInterface.update();

    if (pollicino.x < 1024) {
      background.alpha = 1;
      groundGroup.alpha = 1;
      background1.alpha = 0.1;
      transition.alpha = 1;
    }

    if (pollicino.x > 1024) {
      game.world.setBounds(0, 0, 4096, 768);
      background1.animations.play('drop', 4, false);
      background.alpha = 0.1;
      background1.alpha = 1;
      transition.alpha = 1;
    }

    if (pollicino.x > 1440) {
      sindaco.alpha = 1;
      vignetta.alpha = 0;
      sindacoText.alpha = 0;
    }
    if (pollicino.x > 1660) {
      sindacoText.alpha = 1;
      sindacoText.text = 'Ciao! \n Benvenuto!';
      vignetta.alpha = 1;
    } else {
      sindacoText.alpha = 0;
      vignetta.alpha = 0;
    }
  }
};

let
  background2,
  sindaco,
  vignetta,
  sindacoText,
  background,
  background1,
  transition;

function createBackgrounds(game) {
  background1 = game.add.sprite(1024, 0, 'background1');
  background1.animations.add('drop');
  background2 = game.add.sprite(2048, 0, 'background2');

  background = game.add.sprite(0, 0, 'background');
  background.animations.add('light');
  background.animations.play('light', 4, true);
  transition = game.add.sprite(750, 0, 'transition');

  backgroundGroup.add(background1);
  backgroundGroup.add(background2);
  backgroundGroup.add(background);
  backgroundGroup.add(transition);
}

function createTerrain(game) {
  groundGroup.enableBody = true;
  groundGroup.physicsBodyType = Phaser.Physics.ARCADE;
  groundGroup.add(game.add.sprite(0, 600, 'ground'));
  groundGroup.add(game.add.sprite(300, 480, 'platform'));
  groundGroup.add(game.add.sprite(1100, 500, 'platform1'));
  groundGroup.add(game.add.sprite(1580, 400, 'platform1'));
  groundGroup.add(game.add.sprite(2100, 500, 'platform2'));
  groundGroup.add(game.add.sprite(2680, 400, 'platform2'));
  groundGroup.add(game.add.sprite(3200, 300, 'platform2'));
  groundGroup.setAll('body.immovable', true);
}

function touchEnemyCallback(pollicinoSprite, enemySprite) {
  let enemy = this.enemyFactory.findEnemy(enemySprite.id);

  if (enemy == undefined) return;

  this.pollicino.damageWithRedTint(enemy.damage);
}

function getRocksCallback(pollicinoSprite, sackSprite) {
  this.pollicino.getRocks(sackSprite);
}

function hitEnemyCallback(enemySprite, bulletSprite) {
  let weapon = this.pollicino.weapon;
  let enemy = this.enemyFactory.findEnemy(enemySprite.id);
  bulletSprite.kill();

  if (enemy == undefined) return;

  enemy.damageWithRedTint(weapon.damage);
  if (enemySprite.id == 0 && !enemy.health.isAlive) {
    this.pollicino.hasCompletedTutorial = true;
  }

}
