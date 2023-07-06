ig.module(
	'game.main' 
)
.requires(
	'impact.game',
	'game.levels.Dorm',
	'impact.font',
	// 'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	coins: 0,
	imagewin: null,
	imageloss: null,
	win: false,
	remainingTime: 600,
	gravity: 300,
	loss: false,
	init: function() {
		// Initialize your game here; bind keys etc.

		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );

		this.loadLevel( LevelDorm );
		this.imagewin = new ig.Image("media/gagner.png");
		this.imageloss = new ig.Image("media/perdu.png");
		
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		var coin = ig.game.getEntitiesByType(EntityCollectible)[0];
		var play = ig.game.getEntitiesByType(EntityPlayer)[0];
		if (play) {
			if (this.remainingTime <= 0) {
				this.loss = true;
				play.finalkill();
			}
			if (this.coins >= 5) {
				play.finalkill();
			}
			else {
				this.remainingTime -= ig.system.tick;
			}
		// if (coin) {
		// if (coin.touches(play)) {
		//   this.coins++;
		//   coin.kill();
		//   if (this.coins = 5) {
		// 	  win = true;
		//   }
		// }
		// }

		// Add your own, additional update code here
		}
		this.updateTimerDisplay();
	},
	
	updateTimerDisplay: function() {
		var timerElement = document.getElementById("timer");

		var minutes = Math.floor(this.remainingTime / 60);
		var seconds = Math.floor(this.remainingTime % 60);
		var timeString = minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");

		timerElement.textContent = timeString;
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// // Add your own drawing code here
		// var x = ig.system.width/2,
		// 	y = ig.system.height/2;
		if (this.remainingTime <= 0) {
			var x = ig.system.width / 2;
			var y = ig.system.height / 2;
			this.imageloss.draw(x, y);
		}
		if (this.coins >= 5) {
			var x = ig.system.width / 2;
			var y = ig.system.height / 2;
			this.imagewin.draw(x, y);
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 3600, 1800, 0.5 );

});
