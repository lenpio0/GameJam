ig.module(
    'game.entities.spike'
)
 .requires(
    'impact.entity'
)
.defines(function(){
    EntitySpike = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/pikes.png', 32, 32 ),
        size: {x: 32, y: 32},
        offset: {x: 0, y: 0},
        flip: false,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        debugDraw: true,

        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.addAnim('idle', 1, [0]);
        },
        check: function( other ) {
            other.receiveDamage( 10, this );
        }
    });
});