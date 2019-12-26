import { Character, Health, Speed } from "./Components.js";
import { calculateDistance } from "./Utils.js";

export class EnemyFactory {
    constructor(game, enemyGroup) {
        this.game = game;
        this.aliveEnemies = {};
        this.enemyGroup = enemyGroup;
        this.idCounter = 0;
    }
    create(enemyName, x, y, target) {
        let enemy;
        if (enemyName === "ladybug") {
            enemy = new Ladybug(this.game, x, y, this.enemyGroup, target);
        }
        else if (enemyName === "bee") {

        }
        else {
            return;
        }
        enemy.sprite.id = this.idCounter;
        this.enemyGroup.add(enemy.sprite);
        this.aliveEnemies[this.idCounter] = enemy;
        this.idCounter++;
    }

    findEnemy(enemyId) {
        return this.aliveEnemies[enemyId];
    }

    update() {
        for (let id in this.aliveEnemies) {
            let enemy = this.aliveEnemies[id];
            enemy.update();
            if (!enemy.health.isAlive) {
                enemy.sprite.kill();
                delete this.aliveEnemies[id];
            }
        }
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
        this.sprite.animations.add('fly');


    }
    update() {
        this.wakeUpNearTarget();
        if (this.wakeup) {
            this.body.velocity.x = (this.sprite.x > this.target.x ? -1 : 1) * this.speed.maxHorizontal;
        }
        this.sprite.animations.play('fly', 4, true);
    }

    wakeUpNearTarget() {
        let distance = calculateDistance(this.sprite.x, this.target.x);
        if (distance < 500) {
            this.wakeup = true;
        }
    }

}