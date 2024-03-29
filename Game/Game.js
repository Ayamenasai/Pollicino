import { GameState } from "./States/GameState.js";
import { MenuState } from "./States/MenuState.js";
import { GameOver } from "./States/GameOver.js";
import { FirstRender } from "./States/FirstRender.js";
import { SecondRender } from "./States/SecondRender.js";
import { ThirdRender } from "./States/ThirdRender.js";
import { FourthRender } from "./States/FourthRender.js";
import { FifthRender } from "./States/FifthRender.js";
import { PergamenaFinale } from "./States/PergamenaFinale.js";
import { Letter } from "./States/Letter.js";
import { FinalRender } from "./States/FinalRender.js";
import { Autori } from "./States/Autori.js";
import { Credits } from "./States/Credits.js";
import { Extra } from "./States/Extra.js";
import { Extra1 } from "./States/Extra1.js";
import { Extra2 } from "./States/Extra2.js";
import { Extra3 } from "./States/Extra3.js";
import { Extra4 } from "./States/Extra4.js";
import { Extra5 } from "./States/Extra5.js";
import { Extra6 } from "./States/Extra6.js";

let game = new Phaser.Game(1024, 768, Phaser.AUTO, "The best game");

game.state.add("Game", GameState);
game.state.add("Menu", MenuState);
game.state.add("Credits", Credits);
game.state.add("Autori", Autori);
game.state.add("Extra", Extra);
game.state.add("Extra1", Extra1);
game.state.add("Extra2", Extra2);
game.state.add("Extra3", Extra3);
game.state.add("Extra4", Extra4);
game.state.add("Extra5", Extra5);
game.state.add("Extra6", Extra6);
game.state.add("FirstRender", FirstRender);
game.state.add("SecondRender", SecondRender);
game.state.add("ThirdRender", ThirdRender);
game.state.add("FourthRender", FourthRender);
game.state.add("FifthRender", FifthRender);
game.state.add("Letter", Letter);
game.state.add("PergamenaFinale", PergamenaFinale);
game.state.add("FinalRender", FinalRender);
game.state.add("GameOver", GameOver);
game.state.start("Menu");