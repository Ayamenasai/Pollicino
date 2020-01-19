export let PergamenaFinale = {
    preload: function (game) {
        game.load.image('pergamena', 'Assets/Backgrounds/pergamenaFinale.png');
        game.load.image('arrow', 'Assets/Icons/arrow.png');


    },
    create: function (game) {
        game.add.sprite(0, 0, 'pergamena');
        arrow = game.add.sprite(810, 660, 'arrow');
        arrow.inputEnabled = true;

        arrow.events.onInputDown.add(Next, { args: game });
       
    },
    update: function (game) {

        if (arrow.input.pointerOver()) {
            arrow.alpha = 0.5;
        }
        else {
            arrow.alpha = 1;
        }
    }

};
let arrow, arrowLeft;
function Next(sprite, pointer) {
    pointer.game.state.start("Menu");
}
