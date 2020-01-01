export class MainUserInterface {
    constructor(game, pollicino) {
        this.game = game;
        this.pollicino = pollicino;

        this.inventory = game.add.sprite(870, 80, 'inventory');
        this.inventory.anchor.set(0.5);
        this.inventory.fixedToCamera = true;

        this.fionda = game.add.sprite(40, 150, 'fionda');
        this.fionda.fixedToCamera = true;
        this.fionda.alpha = 0;

        this.polline = game.add.sprite(810, 55, 'pollen');
        this.polline.fixedToCamera = true;
        this.polline.alpha = 0.5;

        this.star = game.add.sprite(780, 60, 'star');
        this.star.fixedToCamera = true;
        this.star.alpha = 0.3;

        this.healthBar = game.add.sprite(60, 80, 'healthBar');
        this.healthBar.fixedToCamera = true;

        this.life = game.add.sprite(40, 70, 'heart');
        this.life.fixedToCamera = true;

        this.bulletsNumberText = game.add.text(120, 160, '', {
            fontFamily: 'Gill Sans',
            fontSize: '36px',
            fill: '#FFC300'
        });
        this.bulletsNumberText.fixedToCamera = true;
        this.bulletsNumberText.alpha = 0;

    }

    update() {
        let health = this.pollicino.health;
        let weapon = this.pollicino.weapon;

        this.healthBar.width = (health.current / health.max) * 200;
        this.bulletsNumberText.text = weapon.currentBullets;
    

    }
}