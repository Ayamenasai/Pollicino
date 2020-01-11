export class MainUserInterface {
    constructor(game, pollicino) {
        this.game = game;
        this.pollicino = pollicino;

        this.inventory = game.add.sprite(870, 80, 'inventory');
        this.inventory.anchor.set(0.5);
        this.inventory.fixedToCamera = true;

        this.fionda = game.add.sprite(40, 130, 'fionda');
        this.fionda.fixedToCamera = true;
        this.fionda.alpha = 0;

        this.polline = game.add.sprite(825, 68, 'pollen');
        this.polline.fixedToCamera = true;
        this.polline.alpha = 0.5;

        this.bava = game.add.sprite(865, 63, 'bava');
        this.bava.fixedToCamera = true;
        this.bava.alpha = 0.5;

        this.fiore = game.add.sprite(920, 60, 'flower');
        this.fiore.fixedToCamera = true;
        this.fiore.alpha = 0.5;

        this.star = game.add.sprite(780, 60, 'star');
        this.star.fixedToCamera = true;
        this.star.alpha = 0.3;

        this.grey = game.add.sprite(60, 70, 'grey');
        this.grey.fixedToCamera = true;

        this.healthBar = game.add.sprite(60, 70, 'healthBar');
        this.healthBar.fixedToCamera = true;

        this.life = game.add.sprite(40, 60, 'heart');
        this.life.fixedToCamera = true;

      

        this.bulletsNumberText = game.add.text(110, 140, '', {
            fontFamily: 'Gill Sans',
            fontSize: '34px',
            fill: '#DAA520'
        });
        this.bulletsNumberText.fixedToCamera = true;
        this.bulletsNumberText.alpha = 0;

    }

    update() {
        let health = this.pollicino.health;
        let weapon = this.pollicino.weapon;

        this.healthBar.width = (health.current / health.max) * 180;
        this.bulletsNumberText.text = weapon.currentBullets;
        this.grey.width = health.max;

    }
}