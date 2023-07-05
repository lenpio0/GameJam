ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	// 'impact.font',
	'game.levels.Dorm',
	// 'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	// font: new ig.Font( 'media/04b03.font.png' ),
	
	gravity: 300,
	init: function() {
		// Initialize your game here; bind keys etc.

		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );

		this.loadLevel( LevelDorm );
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		
		
		// // Add your own drawing code here
		// var x = ig.system.width/2,
		// 	y = ig.system.height/2;
		
		// this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 3600, 1800, 0.5 );

});
