export let Autori = {
    preload: function (game) {
        game.load.image('cover', 'Assets/Backgrounds/coverCredits.png');
        game.load.image('credits', 'Assets/Backgrounds/credits.png');
        game.load.image('arrow', 'Assets/Icons/arrow.png');
        game.load.image('arrowLeft', 'Assets/Icons/arrowLeft.png');


    },
    create: function (game) {
        game.add.sprite(20, 0, 'cover');
        game.add.sprite(110, 10, 'credits');
        arrow = game.add.sprite(810, 660, 'arrow');
        arrowLeft = game.add.sprite(120, 660, 'arrowLeft');
        arrow.inputEnabled = true;
        arrowLeft.inputEnabled = true;
        arrow.events.onInputDown.add(Next, { args: game });
        arrowLeft.events.onInputDown.add(Previous, { args: game });
    },
    update: function (game) {
        if (arrow.input.pointerOver()) {
            arrow.alpha = 0.5;
        }
        else {
            arrow.alpha = 1;
        }
        if (arrowLeft.input.pointerOver()) {
            arrowLeft.alpha = 0.5;
        }
        else {
            arrowLeft.alpha = 1;
        }
    }

};
let arrow, arrowLeft;
function Next(sprite, pointer) {
    pointer.game.state.start("Credits");
}
function Previous(sprite, pointer) {
    pointer.game.state.start("Menu");
}