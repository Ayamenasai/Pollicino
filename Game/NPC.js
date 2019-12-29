import { sindacoText, NPCTextFormat, golemText } from "./Text.js";
import { calculateDistance } from "./Utils.js";
import { GameObject } from "./Components.js";
export class NPCFactory {
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
    findClosestNPC(target) {
        let closestNPC = null;
        let minDistance = null;
        for (let i = 0; i < this.NPCS.length; i++){
            let NPC = this.NPCS[i];
            let distance = calculateDistance(target.sprite.x, NPC.sprite.x);
        
            if (minDistance == null || distance < minDistance) {
                minDistance = distance;
                closestNPC = NPC;
            }
        }
        return closestNPC;
    }
}

class NPC extends GameObject {
    constructor(game, x, y, spriteName, text, target) {
        super(game, spriteName, x, y);
        this.baloon = game.add.sprite(x - 60, y - 60, 'baloon');
        this.associatedText = game.add.text(x - 50, y - 50, text, NPCTextFormat);
        this.associatedText.wordWrap = true;
        this.associatedText.useAdvancedWrap = false;
        this.associatedText.wordWrapWidth = 160;
        this.target = target.sprite;
        this.targetDistance = calculateDistance(this.target.x, this.sprite.x);
        this.updateBalloon();

    }
    interaction() {
        
    }
    update() {
        this.targetDistance = calculateDistance(this.target.x, this.sprite.x);
        if (this.targetDistance < 90) {
            this.associatedText.alpha = 1;
            this.baloon.alpha = 1;
        }
        else {
            this.associatedText.alpha = 0;
            this.baloon.alpha = 0;
        }

    }
    updateBalloon() {
        this.baloon.width = this.associatedText.width + 30; 
        this.baloon.height = this.associatedText.height + 10;
    }
} 

class NPCWithMultipleText extends NPC {
    constructor(game, x, y, spriteName, textList, target) {
        super(game, x, y, spriteName, textList[0],target);
        this.textList = textList;
        this.currentElement = 0;
        
    }
    interaction() {
        if (this.currentElement < this.textList.length - 1
            && this.targetDistance < 90) {
            this.currentElement += 1;
            let text = this.textList[this.currentElement];
            this.associatedText.text = text;
            this.updateBalloon();
        }
       
    }
}
class Sindaco extends NPCWithMultipleText {
    constructor(game, x, y, target) {
        super(game, x, y, 'sindaco', sindacoText, target);
        this.sprite.animations.add('idleSindaco');
        this.sprite.animations.play('idleSindaco', 3, true);


    }
}
class Golem extends NPCWithMultipleText {
    constructor(game, x, y, target) {
        super(game, x, y, 'golem', golemText, target);
        this.sprite.animations.add('idleGolem');
        this.sprite.animations.play('idleGolem', 9, true);


    }
}