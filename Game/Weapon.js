import { Speed, GameObject } from "./Components.js";
export class Weapon {
    constructor(game, x, y, collisionGroup, bulletName){
        this.game = game;
        this.x = x;
        this.y = y;
        this.collisionGroup = collisionGroup;
        this.bulletName = bulletName;
        this.direction ='right';
        this.fireRate = 1;
        this.maxBullets = 0;
        this.damage = 10;
        this.currentBullets = 0;
        this.lastShotTime = 0;
        this.bulletSpeed = new Speed(100, 0);
    }
    fire(){
        if (this.currentBullets <= 0 || !this.canShoot()) {
            return;
        }
        
        this.lastShotTime = this.game.time.totalElapsedSeconds();
        this.currentBullets -= 1;
        let bulletDirection= this.direction === 'right' ? 1:-1 ;
        new Bullet(this.game, this, this.bulletName, this.x, this.y,
            new Speed(this.bulletSpeed.maxHorizontal * bulletDirection, this.bulletSpeed.maxVertical), this.collisionGroup);   
    }

    canShoot() {
        let currentTime = this.game.time.totalElapsedSeconds();
        if (currentTime - this.lastShotTime <= 1 / this.fireRate) {
            return false;
        }
        return true;
    }
    trackSprite(sprite){
        this.x = sprite.x;
        this.y = sprite.y;
        this.direction = sprite.body.velocity.x >= 0 ? 'right':'left';
    }
}
class Bullet extends GameObject {
    constructor(game, weapon, bulletName, x, y, speed, collisionGroup){
        super(game, bulletName, x, y);
        this.sprite.weapon = weapon;
        this.sprite.lifespan = 10000;
        collisionGroup.add(this.sprite);
        this.body.gravity.y = 50;
        this.body.velocity.x = speed.maxHorizontal;
        this.body.velocity.y = speed.maxVertical;
    }
}