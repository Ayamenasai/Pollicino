export class MainUserInterface {
    constructor(game, pollicino) {
        this.game = game;
        this.pollicino = pollicino;

        this.inventory = game.add.sprite(850, 90, 'inventory');
        this.inventory.anchor.set(0.5);
        this.inventory.fixedToCamera = true;

        this.fionda = game.add.sprite(10, 130, 'fionda');
        this.fionda.fixedToCamera = true;
        this.fionda.alpha = 0;

        this.polline = game.add.sprite(800, 65, 'pollen');
        this.polline.fixedToCamera = true;
        this.polline.alpha = 0.5;

        this.star = game.add.sprite(760, 70, 'star');
        this.star.fixedToCamera = true;
        this.star.alpha = 0.3;

        this.healthBar = game.add.sprite(30, 60, 'healthBar');
        this.healthBar.fixedToCamera = true;

        this.life = game.add.sprite(10, 48, 'heart');
        this.life.fixedToCamera = true;

        this.bulletsNumberText = game.add.text(90, 140, '', {
            fontFamily: 'Gill Sans',
            fontSize: '32px',
            fill: '#FFC300'
        });
        this.bulletsNumberText.fixedToCamera = true;
        this.bulletsNumberText.alpha = 0;

    }

    update() {
        let health = this.pollicino.health;
        let weapon = this.pollicino.weapon;

        this.healthBar.width = (health.current / health.max) * 250;
        this.bulletsNumberText.text = weapon.currentBullets;
    

    }
}