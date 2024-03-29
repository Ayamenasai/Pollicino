export let SecondRender = {
    preload: function(game){
        game.load.image('secondRender', 'Assets/Backgrounds/render2.png');
        game.load.image('pergamena', 'Assets/Backgrounds/pergamena2.png');
        game.load.image('arrow', 'Assets/Icons/arrow.png');
        game.load.image('arrowLeft', 'Assets/Icons/arrowLeft.png');


    },
    create: function(game){
        game.add.sprite(0, 0, 'secondRender');
        game.add.sprite(298, 580, 'pergamena');
        arrow = game.add.sprite(896, 720, 'arrow');
        arrowLeft = game.add.sprite(366, 720, 'arrowLeft');
        arrow.inputEnabled = true;
        arrowLeft.inputEnabled = true;
        
        arrow.events.onInputDown.add(Next, { args: game });
        arrowLeft.events.onInputDown.add(Previous, { args: game });
    },
    update: function(game){

        if (arrow.input.pointerOver()) {
           arrow.alpha = 0.5;
        }
        else{
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
function Next(sprite, pointer){
    pointer.game.state.start("ThirdRender");
}
function Previous(sprite, pointer) {
    pointer.game.state.start("FirstRender");
}
