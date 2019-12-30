import { Character, Health, Speed } from "./Components.js";
import { Weapon } from "./Weapon.js";
import { buildFramesArray } from "./Utils.js";

export class Pollicino extends Character {
    constructor(game, x, y, friendlyBulletGroup) {
        super(game, 'pollicino', x, y, new Speed(200, 300), new Health(100));
        this.body.collideWorldBounds = false;
        this.body.gravity.y = 350;
        this.body.setSize(30, 148, 20, 5);
        this.sprite.anchor.setTo(0.5);
        this.closestNPC = null;

        this.weapon = new Weapon(game, x, y, friendlyBulletGroup,'bullets');
        this.weapon.bulletSpeed.maxHorizontal = 300;
        this.weapon.bulletSpeed.maxVertical = -Math.random() * 150;
        this.weapon.fireRate = 1;

        this.firstSackCollected = false;
        this.hasCompletedTutorial = false;
        this.invulnerabilityPeriod = 1;

        game.camera.follow(this.sprite);

        this.buildInputKeys();
        this.buildAnimations();
    }

    buildInputKeys() {
        this.cursorButton = this.game.input.keyboard.createCursorKeys();
        this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.takeButton = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
    }

    buildAnimations() {
        this.sprite.animations.add('walkLeft', buildFramesArray('walkLeft', 9));
        this.sprite.animations.add('walkRight', buildFramesArray('walkRight', 9));
        this.sprite.animations.add('jumpRight', buildFramesArray('jumpRight', 6));
        this.sprite.animations.add('idle', buildFramesArray('idle', 2));
        this.sprite.animations.add('rockRight', buildFramesArray('rockRight', 8));
        this.sprite.animations.add('rockLeft', buildFramesArray('rockLeft', 7));
    }

    update() {
        this.updateInput();
        this.weapon.trackSprite(this.sprite);

        if (this.sprite.x < 0) {
            this.sprite.x = 0;
        }

        if (!this.health.isAlive || this.sprite.y > 768) {
            this.sprite.kill();
            this.game.state.start('GameOver');
        }
    }

    updateInput() {
        if (!this.cursorButton.left.isDown &&
            !this.cursorButton.right.isDown &&
            !this.jumpButton.isDown) {
            this.sprite.animations.play('idle', 2, true);
            this.body.velocity.x = 0;
        }
        if (this.game.input.keyboard.justPressed(Phaser.Keyboard.A) && this.closestNPC != null) {
            this.closestNPC.interaction();
        }

        if (this.shootButton.isDown) {
            this.weapon.fire();
            this.sprite.animations.play('rockRight', 8, true);
        }

        if (this.cursorButton.left.isDown) {
            this.body.velocity.x = -this.speed.maxHorizontal;
            this.sprite.animations.play('walkLeft', 9, true);
        }
        if (this.cursorButton.right.isDown) {
            this.body.velocity.x = this.speed.maxHorizontal;
            this.sprite.animations.play('walkRight', 6, true);
        }

        if (this.jumpButton.isDown && (this.body.onFloor() || this.body.touching.down)) {
            this.body.velocity.y = -this.speed.maxVertical;
            this.sprite.animations.play('jumpRight', 6, true);
            this.body.bounce.y = 0.1;
        }
    }

    getRocks(sackSprite) {
        if (this.takeButton.isDown) {
            this.firstSackCollected = true;
            this.weapon.currentBullets += 30;
            sackSprite.kill();
        }
    }
}