export let Extra1 = {
    preload: function (game) {
        game.load.image('extra', 'Assets/Backgrounds/extra1.png');
        game.load.image('arrow', 'Assets/Icons/arrow.png');
        game.load.image('arrowLeft', 'Assets/Icons/arrowLeft.png');


    },
    create: function (game) {
        game.add.sprite(16, 0, 'extra');
        arrow = game.add.sprite(850, 660, 'arrow');
        arrowLeft = game.add.sprite(110, 660, 'arrowLeft');
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
    pointer.game.state.start("Extra2");
}
function Previous(sprite, pointer) {
    pointer.game.state.start("Extra");
}