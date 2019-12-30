import { GameObject } from "../Components.js";
export class GroundFactory {
    constructor(game, groundGroup) {
        this.game = game;
        this.platforms = [];
        this.groundGroup = groundGroup;
    }
    create(platformType,spriteName, x, y,args) {
        let platform;
        if (platformType === "movable") {
            platform = new MovablePlatform(this.game, spriteName, x, y, this.groundGroup, args.isHorizontal, args.range, args.speed);

        }
        else if (platformType === "static") {
            platform = new Platform(this.game, spriteName, x, y, this.groundGroup);

        }
        else {
            return;
        }
        this.groundGroup.add(platform.sprite);
        this.platforms.push(platform);
        return platform;
    }

    update() {
        for (let i = 0; i < this.platforms.length; i++) {
            let platform = this.platforms[i];
            platform.update();

        }
    }
}
class Platform extends GameObject {
    constructor(game, spriteName, x, y, collisionGroup) {
        super(game, spriteName, x, y);
        collisionGroup.add(this.sprite);
        this.body.immovable = true;

    }
    update(){}
}
class MovablePlatform extends Platform {
    constructor(game, spriteName, x, y, collisionGroup, isHorizontal, range, speed) {
        super(game, spriteName, x, y, collisionGroup);
        this.startX = x;
        this.startY = y;
        this.isHorizontal = isHorizontal;
        this.range = range; 
        this.speed = speed;
        this.isArrived = false;

    }
    update() { 
        if (this.isHorizontal) {
            if (this.sprite.x <= this.startX) {
                this.isArrived = false;      
            }
            if (this.sprite.x >= this.startX + this.range) {
                this.isArrived = true;
            }
            if (this.isArrived) {
                this.body.velocity.x = -this.speed;
            }
            else {
                this.body.velocity.x = this.speed; 
            }
        }
        else{
            if (this.sprite.y >= this.startY) {
                this.isArrived = false;
            }
            if (this.sprite.y <= this.startY - this.range) {
                this.isArrived = true;
            }
            if (this.isArrived) {
                this.body.velocity.y = this.speed;
            }
            else {
                this.body.velocity.y = -this.speed;
            }
        } 
    }
}


