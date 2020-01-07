import { GameState } from "./States/GameState.js";
import { MenuState } from "./States/MenuState.js";
import { GameOver } from "./States/gameOver.js";
import { FirstRender } from "./States/FirstRender.js";
import { SecondRender } from "./States/SecondRender.js";

let game = new Phaser.Game(1024, 768, Phaser.AUTO, "The best game");

game.state.add("Game", GameState);
game.state.add("Menu", MenuState);
game.state.add("FirstRender", FirstRender);
game.state.add("SecondRender", SecondRender);
game.state.add("GameOver", GameOver);
game.state.start("Menu");