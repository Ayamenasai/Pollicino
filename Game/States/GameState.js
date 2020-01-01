import { EnemyFactory } from '../Factories/Enemy.js';
import { NPCFactory } from '../Factories/NPC.js';
import { EventFactory } from "../Factories/Events.js";
import { Pollicino } from '../Pollicino.js';
import { MainUserInterface } from "../UserInterface.js";
import { ProximitySymbolFactory } from "../Factories/ProximitySymbol.js";
import { defaultTextFormat, pickupSackText, attackText, tutorialCompletedText } from "../Text.js";
import { GroundFactory } from "../Factories/Ground.js";


let friendlyBulletsGroup, enemyBulletsGroup, enemyGroup, groundGroup, backgroundGroup, sackGroup;
let eventFactory, mainUserInterface, enemyFactory, symbolFactory, npcFactory, groundFactory, pollicino;

export let GameState = {
  preload: function (game) {
    game.load.atlas(
      'pollicino',
      'Assets/Spritesheet/pollicinoAtlas.png',
      'Assets/Spritesheet/pollicinoAtlas.json'
    );
    game.load.atlas(
      'ladybug',
      'Assets/Spritesheet/ladybugAtlas.png',
      'Assets/Spritesheet/ladybugAtlas.json'
    );
    game.load.spritesheet('bee', 'Assets/Spritesheet/ape.png', 421.8, 431);
    game.load.spritesheet('fly', 'Assets/Spritesheet/mosca.png', 82, 80);
    game.load.spritesheet('explosion', 'Assets/Spritesheet/fumo.png',450, 450);
    game.load.spritesheet('sindaco', 'Assets/Personaggi/sindaco.png', 138, 206);
    game.load.spritesheet('golem', 'Assets/Personaggi/golem.png', 352, 376);
    game.load.image('baloon', 'Assets/Personaggi/vignetta.png');
    game.load.spritesheet('background', 'Assets/Backgrounds/back1.png', 1024, 768);
    game.load.spritesheet('background1', 'Assets/Backgrounds/back2.png', 1024, 768);
    game.load.image('background2', 'Assets/Backgrounds/back2.1.png');
    game.load.image('background3', 'Assets/Backgrounds/backVillage.png');
    game.load.image('background4', 'Assets/Backgrounds/back3.0.png');
    game.load.image('background5', 'Assets/Backgrounds/back3.png');
    game.load.image('background6', 'Assets/Backgrounds/back4.png');
    game.load.image('transition', 'Assets/Backgrounds/transition.png');
    game.load.image('healthBar', 'Assets/Icons/Heart1.png');
    game.load.image('heart', 'Assets/Icons/Heart.png');
    game.load.image('poo', 'Assets/Icons/poo.png');
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
    game.load.image('platform3', 'Assets/Terrain/platformMontagna1.png');
    game.load.image('platform4', 'Assets/Terrain/platformMontagna.png');
    game.load.image('platformStagno', 'Assets/Terrain/platformStagno.png');
    game.load.image('platformStagno1', 'Assets/Terrain/platformStagno1.png');
    game.load.image('platformStagno2', 'Assets/Terrain/platformStagno2.png');
    game.load.image('bullets', 'Assets/Icons/rock.png');
  },

  create: function (game) {
    backgroundGroup = game.add.group();
    sackGroup = game.add.physicsGroup();
    enemyBulletsGroup = game.add.group();
    friendlyBulletsGroup = game.add.group();
    groundGroup = game.add.group();
    enemyGroup = game.add.group();

    createBackgrounds(game);
    groundFactory = new GroundFactory(game, groundGroup);
    createTerrain(game);

    pollicino = new Pollicino(game, 100, 520, friendlyBulletsGroup);


    mainUserInterface = new MainUserInterface(game, pollicino);
    eventFactory = new EventFactory(game);

    enemyFactory = new EnemyFactory(game, enemyGroup, enemyBulletsGroup);
    let ladybug = enemyFactory.create('ladybug', 1024, 30, pollicino);
    let bee = enemyFactory.create('bee', 4000, 0, pollicino);
    enemyFactory.create('fly', 4400, 0, pollicino);

    npcFactory = new NPCFactory(game);
    npcFactory.create('sindaco', 1700, 200, pollicino);
    npcFactory.create('golem', 6800, 238, pollicino);


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

    game.world.setBounds(0, 0, 10240, 768);
  },

  update: function (game) {
    game.physics.arcade.collide(groundGroup, pollicino.sprite);

    game.physics.arcade.overlap(pollicino.sprite, sackGroup, getRocksCallback, null, { pollicino });
    game.physics.arcade.overlap(pollicino.sprite, enemyGroup, touchEnemyCallback, null, { pollicino, enemyFactory });
    game.physics.arcade.overlap(pollicino.sprite, enemyBulletsGroup, getHitCallback, null, { pollicino, enemyFactory });
    game.physics.arcade.overlap(enemyGroup, friendlyBulletsGroup, hitEnemyCallback, null, { pollicino, enemyFactory });
    
    enemyFactory.update();
    groundFactory.update();
    npcFactory.update();
    pollicino.update();
    symbolFactory.update();
    eventFactory.update();
    mainUserInterface.update();
    pollicino.closestNPC = npcFactory.findClosestNPC(pollicino);

    if (game.input.keyboard.justPressed(Phaser.Keyboard.ONE)) {
      pollicino.sprite.x = 4500;
      pollicino.sprite.y = 220;
    }
    if (game.input.keyboard.justPressed(Phaser.Keyboard.TWO)) {
      pollicino.sprite.x = 6000;
      pollicino.sprite.y = 220;
    }
  }
};

let
  background2,
  background,
  background1,
  background3,
  background4,
  background5,
  background6,
  transition;

function createBackgrounds(game) {
  background = game.add.sprite(0, 0, 'background');
  background.animations.add('light');
  background.animations.play('light', 4, true);
  background1 = game.add.sprite(1024, 0, 'background1');
  background1.animations.add('drop');
  background2 = game.add.sprite(2048, 0, 'background2');
  background3 = game.add.sprite(3072, 0, 'background3');
  background4 = game.add.sprite(4096, 0, 'background4');
  background5 = game.add.sprite(5120, 0, 'background5');
  background6 = game.add.sprite(6144, 0, 'background6');
  transition = game.add.sprite(750, 0, 'transition');

  backgroundGroup.add(background);
  backgroundGroup.add(background1);
  backgroundGroup.add(background2);
  backgroundGroup.add(background3);
  backgroundGroup.add(background4);
  backgroundGroup.add(background5); 
  backgroundGroup.add(background6); 
  backgroundGroup.add(transition);
}

function createTerrain(game) {
  groundGroup.enableBody = true;
  groundGroup.physicsBodyType = Phaser.Physics.ARCADE;
  groundFactory.create("static", 'ground', 0, 600);
  groundFactory.create("static", 'platform', 300, 480);
  groundFactory.create("static", 'platform1', 1024, 500);
  groundFactory.create("static", 'platform1', 1580, 400);
  groundFactory.create("static", 'platform2', 2100, 500);
  groundFactory.create("static", 'platform2', 2680, 400);
  groundFactory.create("movable", 'platform2', 3200, 300, {isHorizontal: true, range: 100, speed: 100});
  groundFactory.create("static", 'platform2', 3900, 300);
  groundFactory.create("static", 'platform3', 6860, 580);
  groundFactory.create("static", 'platform4', 6120, 560);
  groundFactory.create("static", 'platformStagno1', 4360, 430);
  groundFactory.create("movable", 'platformStagno', 5360, 390, { isHorizontal: true, range: 150, speed: 70});
  groundFactory.create("static", 'platformStagno1', 5790, 480);
  groundFactory.create("static", 'platformStagno2', 4780, 580);
  groundFactory.create("static", 'platformStagno2', 5070, 500);
  groundFactory.create("static", 'platformStagno2', 4780, 580);
}

function touchEnemyCallback(pollicinoSprite, enemySprite) {
  let enemy = this.enemyFactory.findEnemy(enemySprite.id);

  if (enemy == undefined) return;

  this.pollicino.damageWithRedTint(enemy.damage);
}

function getHitCallback(pollicinoSprite, bulletSprite) {
  let weapon = bulletSprite.weapon;
  let pollicino = this.pollicino;
  bulletSprite.kill();
  pollicino.damageWithRedTint(weapon.damage);
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
}
