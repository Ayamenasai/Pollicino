import { Character, Health, Speed, GameObject } from "../Components.js";
import { calculateDistance, buildFramesArray } from "../Utils.js";
import { Weapon } from "../Weapon.js";

export class EnemyFactory {
    constructor(game, enemyGroup, enemyBulletsGroup) {
        this.game = game;
        this.aliveEnemies = {};
        this.enemyGroup = enemyGroup;
        this.enemyBulletsGroup = enemyBulletsGroup;
        this.idCounter = 0;
    }
    create(enemyName, x, y, target) {
        let enemy;
        if (enemyName === "ladybug") {
            enemy = new Ladybug(this.game, x, y, this.enemyGroup, target);
        }
        else if (enemyName === "bee") {
            enemy = new Bee(this.game, x, y, this.enemyGroup, target);
        }
        else if (enemyName === "fly") {
            enemy = new Fly(this.game, x, y, this.enemyGroup, this.enemyBulletsGroup, target);
        }
        else {
            return;
        }
        enemy.sprite.id = this.idCounter;
        this.enemyGroup.add(enemy.sprite);
        this.aliveEnemies[this.idCounter] = enemy;
        this.idCounter++;
        return enemy;
    }

    findEnemy(enemyId) {
        return this.aliveEnemies[enemyId];
    }

    update() {
        for (let id in this.aliveEnemies) {
            let enemy = this.aliveEnemies[id];
            enemy.update();
            if (!enemy.health.isAlive) {
                new EnemyDeath(this.game, enemy.sprite.x, enemy.sprite.y );
                enemy.sprite.kill();

                delete this.aliveEnemies[id];
            }
        }
    }
}
class EnemyDeath extends GameObject{
    constructor(game, x, y) {
        super(game, 'explosion', x, y);  
        this.sprite.animations.add('explosion');
        this.sprite.lifespan = 900;
        this.sprite.animations.play('explosion', 8, true);

    }
    
}
class Enemy extends Character {
    constructor(game, spriteName, x, y, collisionGroup, health, speed, damage) {
        super(game, spriteName, x, y, speed);
        collisionGroup.add(this.sprite);
        this.health = new Health(health);
        this.damage = damage;
    }
}

class Ladybug extends Enemy {
    constructor(game, x, y, collisionGroup, target) {
        super(game, 'ladybug', x, y, collisionGroup, 30, new Speed(100, 0), 10);
        this.wakeup = false;
        this.target = target.sprite;
        this.body.collideWorldBounds = true;
        this.sprite.animations.add('ladybug', buildFramesArray('ladybug', 14));
        this.sprite.animations.play('ladybug', 14, true);


    }
    update() {
        this.wakeUpNearTarget();
        if (this.wakeup) {
            this.body.velocity.x = (this.sprite.x > this.target.x ? -1 : 1) * this.speed.maxHorizontal;
        }
    }

    wakeUpNearTarget() {
        let distance = calculateDistance(this.sprite.x, this.target.x);
        if (distance < 500) {
            this.wakeup = true;
        }
    }

}
class Bee extends Enemy {
    constructor(game, x, y, collisionGroup, target) {
        super(game, 'bee', x, y, collisionGroup, 40, new Speed(150, 30), 10);
        this.wakeup = false;
        this.target = target.sprite;
        this.sprite.animations.add('beeFly');
        this.sprite.animations.play('beeFly', 8, true);
    }
    update() {
        this.wakeUpNearTarget();
        if (this.wakeup) {
            this.body.velocity.x = (this.sprite.x > this.target.x ? -1 : 1) * this.speed.maxHorizontal;
        }
        
    }
    

    wakeUpNearTarget() {
        let distance = calculateDistance(this.sprite.x, this.target.x);
        if (distance < 600) {
            this.wakeup = true;
        }
    }

}
class Fly extends Enemy {
    constructor(game, x, y, collisionGroup, enemyBulletsGroup, target) {
        super(game, 'fly', x, y, collisionGroup, 40, new Speed(400, 0), 5);
        this.wakeup = false;
        this.target = target.sprite;
        this.sprite.animations.add('fly');
        this.sprite.animations.play('fly', 5, true);
        this.weapon = new Weapon(game, x, y, enemyBulletsGroup, 'poo');
        this.weapon.maxBullets = this.weapon.currentBullets = 99999;
        this.weapon.bulletSpeed.maxHorizontal = 0;
        this.weapon.bulletSpeed.maxVertical = 400;
        this.weapon.fireRate = 0.85;
        this.hasLeftPond = false;
        
    }

    update() {
        
        this.weapon.trackSprite(this.sprite);

        this.wakeUpNearTarget();
        if (this.wakeup) {
            this.body.velocity.x = (this.sprite.x > this.target.x ? -1 : 1) * this.speed.maxHorizontal;
            let distance = calculateDistance(this.sprite.x, this.target.x);
            if (distance < 15) {
                this.weapon.fire();
            }
            if (!this.weapon.canShoot()) {
                this.body.velocity.x = 0;
            }
            if (this.sprite.x > 6120 && !this.hasLeftPond) {
                this.hasLeftPond = true; 
                this.sprite.lifespan = 8000;
            }
            if (this.hasLeftPond) {
                this.body.velocity.x = -this.speed.maxHorizontal;
            }
            
        }
        
    }



    wakeUpNearTarget() {
        let distance = calculateDistance(this.sprite.x, this.target.x);
        if (distance < 200) {
            this.wakeup = true;
        }
    }

}