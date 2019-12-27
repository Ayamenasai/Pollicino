import { EnemyFactory } from './Enemy.js';
import { NPCFactory } from './NPC.js';
import { EventFactory } from "./Events.js";
import { Pollicino } from './Pollicino.js';
import { MainUserInterface } from "./UserInterface.js";
import { ProximitySymbolFactory } from "./ProximitySymbol.js";
import { defaultTextFormat, pickupSackText, attackText, tutorialCompletedText } from "./Text.js";


let friendlyBulletsGroup, enemyGroup, groundGroup, backgroundGroup, sackGroup;
let eventFactory, mainUserInterface, enemyFactory, symbolFactory, npcFactory, pollicino;

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
    game.load.image('background3', 'Assets/Backgrounds/backVillage.png');
    game.load.image('background4', 'Assets/Backgrounds/back3.png');
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

    createBackgrounds(game);
    createTerrain(game);

    pollicino = new Pollicino(game, 100, 300, friendlyBulletsGroup);

    mainUserInterface = new MainUserInterface(game, pollicino);
    eventFactory = new EventFactory(game);

    enemyFactory = new EnemyFactory(game, enemyGroup);
    let ladybug = enemyFactory.create('ladybug', 1000, 30, pollicino);
    let bee = enemyFactory.create('bee', 4000,0, pollicino);

    npcFactory = new NPCFactory(game);
    npcFactory.create('sindaco', 1700, 200, pollicino);


    symbolFactory = new ProximitySymbolFactory(game);
    let minDistance = 150;
    symbolFactory.createSprite('frecce', 30, 290, pollicino, minDistance);

    let pickupText = game.add.text(410, 280, pickupSackText, defaultTextFormat);
    let pickupSymbol = game.add.sprite(312, 250, 'E');


    let firstSack = sackGroup.create(480, 420, 'sack');

    eventFactory.add('picked up first sack', 'onKill', {
        sprite: firstSack,
        execute: function () {
          let text = game.add.text(410, 180, attackText, defaultTextFormat);
          let symbol = game.add.sprite (312, 150, 'X');
          pickupText.kill();
          pickupSymbol.kill();
          mainUserInterface.fionda.alpha = 1;
          mainUserInterface.bulletsNumberText.alpha = 1;
          text.lifespan = symbol.lifespan = 2000;
          

        }
    });

    eventFactory.add('tutorial completed', 'onKill', {
      sprite: ladybug.sprite,
      execute: function () {
        mainUserInterface.star.alpha = 1;
        let text = game.add.text(512, 50, tutorialCompletedText, defaultTextFormat);
        text.lifespan = 2000;
  
      }
    });

    eventFactory.add('first level completed', 'onKill', {
      sprite: bee.sprite,
      execute: function () {
        mainUserInterface.polline.alpha = 1;
      }
    });

    game.world.setBounds(0, 0, 5120, 768);




  },

  update: function (game) {
    game.physics.arcade.collide(groundGroup, pollicino.sprite);
    //game.physics.arcade.collide(groundGroup, enemyGroup);

    game.physics.arcade.overlap(pollicino.sprite, sackGroup, getRocksCallback, null, { pollicino });
    game.physics.arcade.overlap(pollicino.sprite, enemyGroup, touchEnemyCallback, null, { pollicino, enemyFactory });
    game.physics.arcade.overlap(enemyGroup, friendlyBulletsGroup, hitEnemyCallback, null, { pollicino, enemyFactory });

    enemyFactory.update();
    npcFactory.update();
    pollicino.update();
    symbolFactory.update();
    eventFactory.update();
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

    
  }
};

let
  background2,
  background,
  background1,
  background3,
  transition;

function createBackgrounds(game) {
  background1 = game.add.sprite(1024, 0, 'background1');
  background1.animations.add('drop');
  background2 = game.add.sprite(2048, 0, 'background2');
  background3 = game.add.sprite(3042, 0, 'background3');

  background = game.add.sprite(0, 0, 'background');
  background.animations.add('light');
  background.animations.play('light', 4, true);
  transition = game.add.sprite(750, 0, 'transition');

  backgroundGroup.add(background1);
  backgroundGroup.add(background2);
  backgroundGroup.add(background3);
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
  if (enemySprite.id == 1 && !enemy.health.isAlive) {
    this.pollicino.polline = true;
  }


}
