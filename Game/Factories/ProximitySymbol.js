import { calculateDistance } from "../Utils.js";

export class ProximitySymbolFactory{
    constructor(game) {
        this.game = game;
        this.symbols = [];
    }
    createText(textName, x, y, textFormatting, target, minDistance) {
        let text = this.game.add.text(x, y, textName, textFormatting);
        return this.generateSymbol(this.game, text, target, minDistance);
    }

    createSprite(spriteName, x, y, target, minDistance) {
        let sprite = this.game.add.sprite(x, y, spriteName);
        return this.generateSymbol(this.game, sprite, target, minDistance);
    }

    generateSymbol(game, symbol, target, minDistance) {
        let s = new ProximitySymbol(game, symbol, target, minDistance);
        this.symbols.push(s);
        return s;
    }

    update() {
        for (let i = 0; i < this.symbols.length; i++) {
            this.symbols[i].update();
        }
    }
}

class ProximitySymbol {
    constructor(game, data, target, minDistance) {
        this.game = game;
        this.data = data;
        this.target = target;
        this.minDistance = minDistance;
        this.isEnabled = true;
    }

    update() {
        let distance = calculateDistance(this.data.x, this.target.sprite.x);
        this.data.alpha = 0;
        if (distance <= this.minDistance && this.isEnabled) {
            this.data.alpha = 1;
        }
    }
}