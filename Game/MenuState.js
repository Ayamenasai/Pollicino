export let MenuState = {
    preload: function(game){
        game.load.image ('cover', 'Assets/Backgrounds/cover.png');
        game.load.image ('icon', 'Assets/Icons/playIcon.png');

    },
    create: function(game){
        game.add.sprite( 0, 0,'cover');
        icon = game.add.sprite( 740, 169,'icon');
        icon.inputEnabled = true;
        
        icon.events.onInputDown.add(GoToGame, {args: game});
    },
    update: function(game){

        if (icon.input.pointerOver()) {
           icon.alpha = 0.5;
        }
        else{
           icon.alpha = 1;
        }
    }

};
let icon;
function GoToGame(sprite, pointer){
    pointer.game.state.start("FirstRender");
}