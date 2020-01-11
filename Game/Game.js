import { GameState } from "./States/GameState.js";
import { MenuState } from "./States/MenuState.js";
import { GameOver } from "./States/gameOver.js";
import { FirstRender } from "./States/FirstRender.js";
import { SecondRender } from "./States/SecondRender.js";
import { ThirdRender } from "./States/ThirdRender.js";
import { FourthRender } from "./States/FourthRender.js";
import { FifthRender } from "./States/FifthRender.js";
import { Letter } from "./States/Letter.js";
import { Credits } from "./States/Credits.js";
import { Extra } from "./States/Extra.js";

let game = new Phaser.Game(1024, 768, Phaser.AUTO, "The best game");

game.state.add("Game", GameState);
game.state.add("Menu", MenuState);
game.state.add("Credits", Credits);
game.state.add("Extra", Extra);
game.state.add("FirstRender", FirstRender);
game.state.add("SecondRender", SecondRender);
game.state.add("ThirdRender", ThirdRender);
game.state.add("FourthRender", FourthRender);
game.state.add("FifthRender", FifthRender);
game.state.add("Letter", Letter);
game.state.add("GameOver", GameOver);
game.state.start("Menu");