export let GameOver = {
    preload: function (game) {
        game.load.image('gameOver', 'Assets/Backgrounds/gameOver.png');
        game.load.image('restart', 'Assets/Icons/iconRestart.png');
        game.load.image('quit', 'Assets/Icons/iconQuit.png');


    },
    create: function (game) {
        game.add.sprite(40, 40, 'gameOver');
        restart = game.add.sprite(212, 384, 'restart');
        restart.inputEnabled = true;
        restart.events.onInputDown.add(startAgain, { args: game });

        quit = game.add.sprite(612, 384, 'quit');
        quit.inputEnabled = true;
        quit.events.onInputDown.add(Quit, { args: game });
        game.sound.stopAll();
    },
    update: function (game) {

        if (restart.input.pointerOver()) {
            restart.alpha = 0.5;
        }

        else {
            restart.alpha = 1;
        }

        if (quit.input.pointerOver()) {
            quit.alpha = 0.5;
        }
        else {
            quit.alpha = 1;
        }
    }

};
let restart, quit;

function startAgain(sprite, pointer) {
    pointer.game.state.start("Game");
}

function Quit(sprite, pointer) {
    pointer.game.state.start("Menu");
}