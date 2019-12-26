
export class GameObject{
    constructor(game, spriteName, x, y) {
        this.game = game;
        this.sprite = game.add.sprite(x, y, spriteName);
        game.physics.arcade.enable(this.sprite);
        this.body = this.sprite.body;   
    }
}

export class Character extends GameObject{
    constructor(game, spriteName, x, y, speed, health) {
        super(game, spriteName, x, y);
        this.speed = speed;
        this.health = health;
        this.lastOverlapTime = 0;
        this.invulnerabilityPeriod = 0;
    }

    damageWithRedTint(value) {
        let currentTime = this.game.time.totalElapsedSeconds();
        if (currentTime - this.lastOverlapTime >= this.invulnerabilityPeriod) {
            this.sprite.tint = 0xff0000;
            this.health.damage(value);
            this.game.time.events.add(200, function () {
                this.sprite.tint = 0xffffff;
            }, this);
            this.lastOverlapTime = currentTime;
        }  
    }
}

export class Health {
    constructor(maxHealth) {
        this.current = maxHealth;
        this.max = maxHealth;
        this.isAlive = true;
    }

    damage(value) {
        this.current -= value;
        if (this.current <= 0) {
            this.current = 0;
            this.isAlive = false;
        }
    }
}

export class Speed {
    constructor(maxHorizontal, maxVertical) {
        this.maxHorizontal = maxHorizontal;
        this.maxVertical = maxVertical;
    }
}

