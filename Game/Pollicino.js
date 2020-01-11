import { Character, Health, Speed } from "./Components.js";
import { Weapon } from "./Weapon.js";
import { buildFramesArray } from "./Utils.js";

export class Pollicino extends Character {
    constructor(game, x, y, friendlyBulletGroup) {
        super(game, 'pollicino', x, y, new Speed(168, 300), new Health(180));
        this.body.collideWorldBounds = false;
        this.body.gravity.y = 370;
        this.body.setSize(30, 148, 20, 8);
        this.sprite.anchor.setTo(0.5);
        this.closestNPC = null;

        this.weapon = new Weapon(game, x, y, friendlyBulletGroup, 'bullets');
        this.weapon.bulletSpeed.maxHorizontal = 300;
        this.weapon.bulletSpeed.maxVertical = -Math.random() * 100;
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
        this.sprite.animations.add('walkL', buildFramesArray('walkLeft', 6), 6, true);
        this.sprite.animations.add('walkR', buildFramesArray('walkRight', 6), 6, true);
        this.sprite.animations.add('idleR', buildFramesArray('idleRight', 3), 3, true);
        this.sprite.animations.add('rockR', buildFramesArray('rockRight', 3), 5, false);

        this.playAnimation('idleR');
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

            this.body.velocity.x = 0;
            if (!this.isThrowingRocks()) {
                this.playAnimation('idleR');
            }
        }
        if (this.game.input.keyboard.justPressed(Phaser.Keyboard.E) && this.closestNPC != null) {
            this.closestNPC.interaction();
        }

        if (this.shootButton.isDown && this.weapon.canShoot()) {
            this.playAnimation('rockR');
            this.weapon.fire();
        }

        if (this.cursorButton.left.isDown) {
            this.body.velocity.x = -this.speed.maxHorizontal;
            if (!this.isThrowingRocks()) {
                this.playAnimation('walkL');
            }
        }
        if (this.cursorButton.right.isDown) {
            this.body.velocity.x = this.speed.maxHorizontal;
            if (!this.isThrowingRocks()) {
                this.playAnimation('walkR');
            }
        }

        if (this.jumpButton.isDown && (this.body.onFloor() || this.body.touching.down)) {
            this.body.velocity.y = -this.speed.maxVertical;
            this.body.bounce.y = 0.1;
        }
    }

    isThrowingRocks() {
        let animationName = this.sprite.animations.currentAnim.name;
        return (animationName == "rockR" || animationName == "rockL") && !this.sprite.animations.currentAnim.isFinished;
    }

    getRocks(sackSprite) {
        if (this.takeButton.isDown) {
            this.firstSackCollected = true;
            this.weapon.currentBullets += 30;
            sackSprite.kill();
        }
    }
}