ig.module(
    'game.entities.collectible'
)
.requires(
    'impact.entity'
)
.defines(function() {

    // Create the Collectible class
    EntityCollectible = ig.Entity.extend({
        size: {x: 32, y: 32}, // Set the size of the collectible item
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        
        // Load the collectible sprite
        animSheet: new ig.AnimationSheet('media/tresor.png', 32, 32),
        
        init: function(x, y, settings) {
            this.parent(x, y, settings);
            
            // Define the animations for the collectible
            this.addAnim('idle', 1, [0]);
        },
        
        // Override the update function
        update: function() {
            this.parent();
        },

        check: function(other) {
            if (other instanceof EntityPlayer) {
                this.collect();
            }
        },

        collect: function() {
            var game = ig.game;
            if (game) {
                game.coins++;
            }
            this.kill();
        }
    });
});