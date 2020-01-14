export let Credits = {
    preload: function (game) {
        game.load.image('cover', 'Assets/Backgrounds/coverCredits.png');
        game.load.image('credits', 'Assets/Backgrounds/credits.png');
        game.load.image('arrowLeft', 'Assets/Icons/arrowLeft.png');
 

    },
    create: function (game) {
        game.add.sprite(20, 0, 'cover');
        game.add.sprite(70, 60, 'credits');
        arrowLeft = game.add.sprite(120, 660, 'arrowLeft');
        arrowLeft.inputEnabled = true;
        arrowLeft.events.onInputDown.add(Previous, { args: game });
    },
    update: function (game) {;
        if (arrowLeft.input.pointerOver()) {
            arrowLeft.alpha = 0.5;
        }
        else {
            arrowLeft.alpha = 1;
        }
    }

};
let arrowLeft;
function Previous(sprite, pointer) {
    pointer.game.state.start("Menu");
}