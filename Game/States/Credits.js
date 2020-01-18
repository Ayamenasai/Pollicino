export let Credits = {
    preload: function (game) {
        game.load.image('crediti', 'Assets/Backgrounds/crediti.png');
        game.load.image('arrowLeft', 'Assets/Icons/arrowLeft.png');
 

    },
    create: function (game) {
        game.add.sprite(0, 0, 'crediti');
        arrowLeft = game.add.sprite(120, 660, 'arrowLeft');
        arrowLeft.inputEnabled = true;
        arrowLeft.events.onInputDown.add(Previous, { args: game });
    },
    update: function (game) {
      
        if (arrowLeft.input.pointerOver()) {
            arrowLeft.alpha = 0.5;
        }
        else {
            arrowLeft.alpha = 1;
        }
    }

};
let  arrowLeft;

function Previous(sprite, pointer) {
    pointer.game.state.start("Autori");
}