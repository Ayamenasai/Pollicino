import { sindacoText, NPCTextFormat } from "./Text.js";
import { calculateDistance } from "./Utils.js";
import { GameObject } from "./Components.js";
export class NPCFactory{
    constructor(game) {
        this.game = game;
        this.NPCS = [];
    }
    create(NPCName, x, y, target) {
        let NPC;
        if (NPCName == "sindaco") {
            NPC = new Sindaco(this.game, x, y, target);
        }
        else if (NPCName == "golem") {
            NPC = new Golem(this.game, x, y, target);
        }
        else {
            return;
        }
        this.NPCS.push(NPC);
    }
    update() {
        for (let i = 0; i < this.NPCS.length; i++) {
            let NPC = this.NPCS[i];
            NPC.update();
        }
    }
}

class NPC extends GameObject {
    constructor(game, x, y, spriteName, associatedText, target) {
        super(game, spriteName, x, y);
        this.baloon = game.add.sprite(x -50, y -50, 'baloon'); 
        this.associatedText = game.add.text( x -40, y -50, associatedText, NPCTextFormat );
        this.target = target.sprite; 
       
    }
    update() {
        let distance = calculateDistance(this.target.x, this.sprite.x);
        if (distance < 90) {
            this.associatedText.alpha = 1;
            this.baloon.alpha = 1; 
        }
        else {
            this.associatedText.alpha = 0;
            this.baloon.alpha = 0; 
        }

    }
}
class Sindaco extends NPC{
    constructor(game, x, y, target) {
        super(game, x, y, 'sindaco', sindacoText, target);
        this.sprite.animations.add('idleSindaco');
        this.sprite.animations.play('idleSindaco', 3, true);

        
    }
}