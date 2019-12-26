export class Weapon {
    constructor(game, x, y, collisionGroup){
        this.game = game;
        this.x = x;
        this.y = y;
        this.collisionGroup = collisionGroup;
        this.fireAngle = 0;
        this.direction ='right';
        this.fireRate = 1;
        this.maxBullets = 0;
        this.damage = 10;
        this.currentBullets = 0;
        this.lastShotTime = 0;
        this.bulletSpeed = 100;
    }
    fire(){
        if (this.currentBullets <= 0) {
            return;
        }
        
        let currentTime = this.game.time.totalElapsedSeconds();
        if (currentTime - this.lastShotTime <= 1 / this.fireRate) {
            return;
        }
        this.lastShotTime = currentTime;
        this.currentBullets -= 1;
        let bulletDirection= this.direction === 'right' ? 1:-1 ;
        new Bullet(this.game, 'bullets', this.x, this.y, this.bulletSpeed * bulletDirection, this.collisionGroup);   
    }
    trackSprite(sprite){
        this.x = sprite.x;
        this.y = sprite.y;
        this.direction = sprite.body.velocity.x >= 0 ? 'right':'left';
    }
}
class Bullet {
    constructor(game, bulletName, x, y, speed, collisionGroup){
        this.game = game;
        this.bulletName = bulletName;
        let sprite = game.add.sprite(x, y, bulletName);
        game.physics.arcade.enable(sprite);
        collisionGroup.add(sprite);
        this.body = sprite.body;
        this.body.velocity.x = speed;
    }
}