export let Extra = {
    preload: function (game) {
        game.load.image('extra', 'Assets/Backgrounds/extra.png');
        game.load.image('arrowLeft', 'Assets/Icons/arrowLeft.png');


    },
    create: function (game) {
        game.add.sprite(0, 0, 'extra');
        arrowLeft = game.add.sprite(20, 690, 'arrowLeft');
        arrowLeft.inputEnabled = true;
        arrowLeft.events.onInputDown.add(Previous, { args: game });
    },
    update: function (game) {
        ;
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