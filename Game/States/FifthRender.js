export let FifthRender = {
    preload: function (game) {
        game.load.image('fifthRender', 'Assets/Backgrounds/render5.png');
        game.load.image('arrow', 'Assets/Icons/arrow.png');
        game.load.image('arrowLeft', 'Assets/Icons/arrowLeft.png');


    },
    create: function (game) {
        game.add.sprite(0, 0, 'fifthRender');
        arrow = game.add.sprite(820, 690, 'arrow');
        arrowLeft = game.add.sprite(340, 690, 'arrowLeft');
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
    pointer.game.state.start("Game");
}
function Previous(sprite, pointer) {
    pointer.game.state.start("FourthRender");
}