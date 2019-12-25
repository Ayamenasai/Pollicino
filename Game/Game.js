import {GameState} from "./GameState.js";
import {MenuState} from "./MenuState.js";
import {GameOver} from "./gameOver.js";
import {FirstRender} from "./FirstRender.js";
import {SecondRender} from "./SecondRender.js";

let game = new Phaser.Game(1024, 768, Phaser.AUTO, "The best game");

game.state.add("Game", GameState);
game.state.add("Menu", MenuState);
game.state.add("FirstRender", FirstRender);
game.state.add("SecondRender", SecondRender);
game.state.add("GameOver", GameOver);
game.state.start("Menu");