export let GameState = {
    
    preload: function(game){
        score = 30;
        health = maxHealth = 50;
        lastOverlapTime = 0;
        wakeup = false;

        game.load.atlas('pollicino', 'Assets/Spritesheet/pollicinoAtlas.png', 'Assets/Spritesheet/pollicinoAtlas.json');
        game.load.spritesheet('ladybug', 'Assets/Spritesheet/ladybug.png',516, 403);
        game.load.image ('bee', 'Assets/Personaggi/ape.png');
        game.load.spritesheet ('sindaco', 'Assets/Personaggi/sindaco.png',138, 206);
        game.load.image ('baloon', 'Assets/Personaggi/vignetta.png');
        game.load.spritesheet ('background', 'Assets/Backgrounds/back1.png', 1024, 768);
        game.load.spritesheet ('background1', 'Assets/Backgrounds/back2.png', 1024, 768);
        game.load.image ('background2', 'Assets/Backgrounds/back2.1.png');
        game.load.image ('background2.1', 'Assets/Backgrounds/backVillage.png');
        game.load.image ('background3', 'Assets/Backgrounds/back3.png');
        game.load.image ('transition', 'Assets/Backgrounds/transition.png');
        game.load.image ('healthBar', 'Assets/Icons/Heart1.png');
        game.load.image ('heart', 'Assets/Icons/Heart.png'); 
        game.load.image ('sack', 'Assets/Icons/sack.png');
        game.load.image ('frecce', 'Assets/Icons/frecce.png');
        game.load.image ('E', 'Assets/Icons/E.png');
        game.load.image ('X', 'Assets/Icons/X.png');
        game.load.image ('inventory', 'Assets/Icons/pergamena.png');
        game.load.image ('pollen', 'Assets/Icons/polline.png');
        game.load.image ('star', 'Assets/Icons/star.png');
        game.load.image ('fionda', 'Assets/Icons/fionda.png');
        game.load.image ('ground', 'Assets/Terrain/ground.png');
        game.load.image ('platform', 'Assets/Terrain/platform.png');
        game.load.image ('platform1', 'Assets/Terrain/platform1.png');
        game.load.image ('platform2', 'Assets/Terrain/platform2.png');
        game.load.image ('bullets', 'Assets/Icons/rock.png');
       
        
    },
    
    create: function(game){
        game.world.setBounds(0, 0, 5120, 768);
        background1 = game.add.sprite( 1024, 0,'background1');
        background1.animations.add('drop');
        background2 = game.add.sprite( 2048, 0,'background2');
        background3 = game.add.sprite( 3072, 0,'background2.1');

        
        background = game.add.sprite( 0, 0,'background');
        background.animations.add('light');
        background.animations.play('light', 4, true);
        transition = game.add.sprite( 750, 0,'transition');
        frecce = game.add.sprite( 30, 290,'frecce');
        take = game.add.sprite( 312, 250,'E');
        take.alpha = 0; 
        shoot = game.add.sprite( 312, 250,'X');
        shoot.alpha = 0; 
        bee = game.add.sprite(3700, 100, 'bee');
        
        ladybug = game.add.sprite(1024,10, 'ladybug');
        vignetta = game.add.sprite(1600,150, 'baloon');
        sindaco = game.add.sprite(1700,210, 'sindaco');
        sindaco.animations.add ('idleSindaco');
        sindaco.animations.play('idleSindaco', 3, true);
        sindacoText = game.add.text(1610, 160, '', { fontFamily: 'Gill Sans',fontSize: '22px', fill: '#000000'});
    
        pollicino = game.add.sprite(30,490, 'pollicino');
        pollicino.animations.add('walkLeft', buildFramesArray('walkLeft', 9));
        pollicino.animations.add('walkRight', buildFramesArray('walkRight', 9));
        pollicino.animations.add('jumpRight', buildFramesArray('jumpRight', 6));
        pollicino.animations.add('idle', buildFramesArray('idle', 2));
        pollicino.animations.add('rockRight', buildFramesArray('rockRight', 8));
        pollicino.animations.add('rockLeft', buildFramesArray('rockLeft', 7));
        game.physics.arcade.enable(pollicino);
        pollicino.body.collideWorldBounds = false;
        pollicino.body.gravity.y = 250;
        game.camera.follow(pollicino);
        pollicino.body.setSize(30, 148, 20, 5);
        pollicino.anchor.setTo(0.5);
     
 
        
        game.physics.arcade.enable(ladybug);
        ladybug.body.collideWorldBounds = true;
        ladybug.animations.add('fly');
    

        inventory = game.add.sprite( 850, 90,'inventory');
        inventory.anchor.set(0.5);
        inventory.fixedToCamera = true;
        fionda = game.add.sprite( 10, 130,'fionda');
        fionda.fixedToCamera = true;
        polline = game.add.sprite( 800, 65,'pollen');
        polline.fixedToCamera = true;
        polline.alpha = 0.5;
        star = game.add.sprite( 760, 70,'star');
        star.fixedToCamera = true;
        star.alpha = 0.3;

        healthBar = game.add.sprite( 30, 60,'healthBar');
        healthBar.fixedToCamera = true;
        life = game.add.sprite( 10, 50,'heart');
        life.fixedToCamera = true;
        
        firstText = game.add.text(410, 280, 'Per prendere \n questo sacchetto!', {fontFamily: 'Gill Sans', fontSize: '22px', fill:'#FFDAA1'});
        firstText.alpha = 0;
        secondText = game.add.text(460, 70, 'Tutorial completato!', {fontFamily: 'Gill Sans', fontSize: '22px',fill:'#FFDAA1'});
        secondText.alpha = 0;
        secondText.fixedToCamera = true;

        weapon = game.add.weapon();
        weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
        weapon.bulletLifespan = 1000;
        weapon.bulletSpeed = 300;
        weapon.trackSprite(pollicino, 0, 0);
        weapon.fireAngle = -5;
        weapon.fireRate = 500;
        weapon.fireLimit = 0;
        
        sack = game.add.physicsGroup();

        ground = game.add.physicsGroup();
        ground.create(0, 600, 'ground');
        platformMove = ground.create(300, 480, 'platform');
        ground.create(1100, 500, 'platform1');
        ground.create(1580, 400, 'platform1');
        ground.create(2100, 500, 'platform2');
        ground.create(2680, 400, 'platform2');
        ground.create(3200, 300, 'platform2');
        platformMove.body.collideWorldBounds = true;
        ground.setAll('body.immovable', true);
        sack.create( 480, 420,'sack');
        
        bulletsNumberText = game.add.text(90, 140, '', { fontFamily: 'Gill Sans',fontSize: '32px', fill: '#FFC300'});
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        takeButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
        shooter = game.input.keyboard.addKey(Phaser.Keyboard.X);
    },
    
    update: function(game){
        game.physics.arcade.collide(pollicino, ground);
        game.physics.arcade.collide(ladybug, ground);
        ladybug.animations.play('fly', 4, true);
        game.physics.arcade.overlap(pollicino, sack, firstRockCollection, null, game);
        game.physics.arcade.overlap(pollicino, ladybug, touchEnemy, null, game);
        game.physics.arcade.overlap(weapon.bullets, ladybug, hitEnemy, null, game);
        healthBar.width = health/maxHealth * 250;
        updateInput(game);  
        if (pollicino < 1024) {
            background.alpha = 1;
            ground.alpha = 1;
            background1.alpha = 0.1;
            transition.alpha = 1;
        }
        
        if (pollicino.x > 1024) {
            game.world.setBounds(0, 0, 4096, 768);
            background1.animations.play('drop', 4, false);
            background.alpha = 0.1;
            background1.alpha = 1;
            transition.alpha = 1; 
            shoot.alpha = 0;
            firstText.alpha = 0;
            take.alpha = 0; 
            secondText.alpha = 0;


        }

        if (pollicino.x <= 0){
            pollicino.x = 0;
        }


        if (pollicino.x > 1440){
            sindaco.alpha = 1;
            vignetta.alpha = 0;
            sindacoText.alpha = 0;    
        }
        if ( pollicino.x > 1660 ){
            sindacoText.alpha = 1;
            sindacoText.text = 'Ciao! \n Benvenuto!';
            vignetta.alpha = 1;
        }
        else {
            sindacoText.alpha = 0;
            vignetta.alpha = 0;
        }
        if (pollicino.x < 530){
            firstText.alpha = 1;
            take.alpha = 1; 
        }
       
        if (!wakeup){
            ladybug.body.velocity.x = 0;
        }
            
        
        if (pollicino.x > 560) {
            wakeup = true;
            take.alpha = 0;
        }
        if (wakeup){
            ladybug.body.velocity.x = (ladybug.body.x > pollicino.x ? -1:1) * 80;
        }

         if (pollicino.x < 200){
             frecce.alpha = 1; 
         }
         else {
             frecce.alpha = 0;
         }

        
    }  
};

let pollicino,ladybug, frecce, ground,platformMove,overBounds, life, inventory, polline, sack, weapon, cursors, jumpButton, cover, icon ;
let  bulletsNumberText,take, shoot, background2, health, maxHealth, healthBar, bee, sindaco, fionda, vignetta, wakeup, lastOverlapTime, firstText, secondText, pause, sindacoText,  background, background1, background3,transition, star, shooter, indicator, score,bullets,scoreRound, takeButton;

function updateInput(game){
    
    if(noKeyPressed()){
        pollicino.animations.play('idle', 2, true);
        pollicino.body.velocity.x = 0
    }

    if(shooter.isDown){
         weapon.fire();
        bulletCounter();
        if (pollicino.x < ladybug.x){
           pollicino.animations.play('rockRight', 8, true);
             }
        else{
            pollicino.animations.play('rockLeft', 7, true);
            weapon.fireAngle = 250;
         }   
    }

    if (cursors.left.isDown){
        pollicino.body.velocity.x = -200;
        pollicino.animations.play('walkLeft', 9, true);
      
    }
     if (cursors.right.isDown){
        pollicino.body.velocity.x = 150;
        pollicino.animations.play('walkRight', 6, true);
    }

    if(jumpButton.isDown && (pollicino.body.onFloor() || pollicino.body.touching.down)){
        pollicino.body.velocity.y = -250;
        pollicino.animations.play('jumpRight', 6, true);
        pollicino.body.bounce.y = 0.1;
    }
}

    function bulletCounter(){
    let shotsRemaining = weapon.fireLimit - weapon.shots;
    if (shotsRemaining > 0){
        bulletsNumberText.text = shotsRemaining;
    }
    }


    function firstRockCollection(pollicino, sack){
     if (takeButton.isDown){
        bullets = weapon.createBullets(15, 'bullets');
        bullets.alpha = 1;
        collectRocks(pollicino, sack);
        shoot.alpha = 1; 
        firstText.text = 'Colpisci \n il nemico!';
        
        }
        

    }



    function collectRocks(pollicino, sack) {
     if (takeButton.isDown){
        sack.kill();
        bulletsNumberText.text = 'Ora hai:' + score + 'proiettili';
        bulletsNumberText.fixedToCamera = true;
        weapon.resetShots(30);
        bulletCounter(); 
    }
    }
 
    function hitEnemy (e, wpn) {
            e.kill();
            wpn.kill();
            star.alpha = 1;
            secondText.alpha = 1;   
    }
    
    
    function touchEnemy (pollicino, ladybug){
        let game = this; 
        let currentTime = game.time.totalElapsedSeconds();
       
        if (currentTime - lastOverlapTime >= 2 ){
            pollicino.tint = 0xff0000;
            game.time.events.add(200, function(){pollicino.tint = 0xffffff;} );
            lastOverlapTime = currentTime;
            Damage(game);
        }
     } 

    function Damage(game){
        health = health - 10; 
        if (health <= 0){
            pollicino.kill();
            game.state.start("GameOver");
          }
       
    } 

    function buildFramesArray(animationName, framesCount){
     let frames = [];

     for(let i = 1; i <= framesCount; i++){
        let frameName = animationName + " (" + i + ")";
        frames.push(frameName);
     }
    return frames;
    }

    function noKeyPressed(){
    
    return !shooter.isDown
    && !cursors.left.isDown
    && !cursors.right.isDown
    && !jumpButton.isDown;
}