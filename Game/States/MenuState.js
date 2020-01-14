export let MenuState = {
    preload: function(game){
        game.load.image ('cover', 'Assets/Backgrounds/cover1.png');
        game.load.image('icon', 'Assets/Icons/storia.png');
        game.load.image('play', 'Assets/Icons/gioca.png');
        game.load.image('crediti', 'Assets/Icons/crediti.png');
        game.load.image('extra', 'Assets/Icons/extra.png');
    },
    create: function(game){
        game.add.sprite( 0, 0,'cover');
        storyIcon = game.add.sprite(633, 276, 'icon');
        playIcon = game.add.sprite(690, 456, 'play');
        creditsIcon = game.add.sprite(690, 667, 'crediti');
        extraIcon = game.add.sprite(600, 568, 'extra');
        playIcon.inputEnabled = true;
        creditsIcon.inputEnabled = true;
        storyIcon.inputEnabled = true;
        extraIcon.inputEnabled = true;
        
        storyIcon.events.onInputDown.add(GoToStory, { args: game });
        playIcon.events.onInputDown.add(GoToGame, { args: game });
        creditsIcon.events.onInputDown.add(GoToCredits, { args: game });
        extraIcon.events.onInputDown.add(GoToExtra, { args: game });
    },
    update: function(game){

        if (storyIcon.input.pointerOver()) {
            storyIcon.alpha = 0.5;
        }
        else{
            storyIcon.alpha = 1;
        }
        if (playIcon.input.pointerOver()) {
            playIcon.alpha = 0.5;
        }
        else {
            playIcon.alpha = 1;
        }
        if (creditsIcon.input.pointerOver()) {
            creditsIcon.alpha = 0.5;
        }
        else {
            creditsIcon.alpha = 1;
        }
        if (extraIcon.input.pointerOver()) {
            extraIcon.alpha = 0.5;
        }
        else {
            extraIcon.alpha = 1;
        }
    }

};
let storyIcon, playIcon, creditsIcon, extraIcon;
function GoToStory(sprite, pointer){
    pointer.game.state.start("FirstRender");
}
function GoToGame(sprite, pointer) {
    pointer.game.state.start("Game");
}
function GoToCredits(sprite, pointer) {
    pointer.game.state.start("Credits");
}
function GoToExtra(sprite, pointer) {
    pointer.game.state.start("Extra");
}