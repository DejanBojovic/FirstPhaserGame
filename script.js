// create only one scene called mainScene
class mainScene {

    // this method is called at the beggining
    // it loads assets
    preload() {
        // name of the sprite, path to the image
        this.load.image('player', 'assets/player.png');
        this.load.image('coin', 'assets/coin.png');
        

    }

    // this method is called once, after preload
    // it initializes the scene
    // puts everything in the right place
    create() {
        // x position, y position, name of the sprite
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.coin = this.physics.add.sprite(400, 200, 'coin');

        // adding score
        this.score = 0;
        // styling the score
        let style = {
            font: '25px Arial',
            fill: '#fff'

        }
        // adding score to the page
        // position, score(text), style for the score
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);

        // creating key inputs for the player
        this.arrow = this.input.keyboard.createCursorKeys();
    }

    // this method is called 60 times per second after calling "create" method
    // it handles the game's logic
    update() {
        // if player is coliding with the coin
        if(this.physics.overlap(this.player, this.coin)) {
            // call "hit" method
            this.hit();
        }

        // how should player respond to arrow keys
        // horizontal movememnts (x axis)
        if(this.arrow.right.isDown) {
            // if arrow right is pressed
            this.player.x += 4;
        } else if(this.arrow.left.isDown) {
            this.player.x -= 4;
        }

        // how should player respond to arrow keys
        // vertical movements (y axis)
        if(this.arrow.down.isDown) {
            this.player.y += 4;
        } else if(this.arrow.up.isDown) {
            this.player.y -= 4;
        }

    }

    // this function is called when colision of player and coin happens
    // it updates the score and sets a new random position for the coin
    hit() {
        // change position x and y of the coin randomly
        this.coin.x = Phaser.Math.Between(100, 700);
        this.coin.y = Phaser.Math.Between(100, 400);

        // increment score by 10
        this.score += 10;

        // display updated score on the screen
        this.scoreText.setText('score: ' + this.score);

        // create a tween for the player
        this.tweens.add({
            targets: this.player, // adding it on the player
            duration: 300, // 0.3s
            scaleX: 1.2, // scale horizontally by 20%
            scaleY: 1.2, // scale vertically by 20%
            yoyo: true // at the end go back to original state
        })
    }

}

// that mainScene is being called here with all aditional info for the game
new Phaser.Game({
    width: 800, // Width of the game in pixels
    height: 500, // Height of the game in pixels
    backgroundColor: '#e86b48', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
});