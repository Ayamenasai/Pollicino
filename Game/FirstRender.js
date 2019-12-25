export let FirstRender = {
    preload: function(game){
        game.load.image ('firstRender', 'Assets/Backgrounds/render1.png');
        game.load.image ('arrow', 'Assets/Icons/arrow.png');

    },
    create: function(game){
        game.add.sprite( 0, 0,'firstRender');
        arrow = game.add.sprite( 700, 500,'arrow');
        arrow.inputEnabled = true;
        
        arrow.events.onInputDown.add(Next, {args: game});
    },
    update: function(game){

        if (arrow.input.pointerOver()) {
           arrow.alpha = 0.5;
        }
        else{
           arrow.alpha = 1;
        }
    }

};
let arrow;
function Next(sprite, pointer){
    pointer.game.state.start("SecondRender");
}