ig.module(
      'game.entities.player'
)
.requires(
      'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/player.png', 32, 32 ),
        size: {x: 32, y:32},
        offset: {x: 0, y: 0},
        flip: false,
        maxVel: {x: 200, y: 500},
        friction: {x: 600, y: 0},
        accelGround: 1000,
        accelAir: 1000,
        jump: 200,
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        startPosition: null,
        
        init: function( x, y, settings ) {
            this.startPosition = {x:x,y:y};
            this.parent( x, y, settings );
            this.addAnim( 'idle', 1, [0] );
            this.addAnim( 'run', 0.07, [0,1,2,3,4,5] );
            this.addAnim( 'jump', 1, [9] );
            this.addAnim( 'fall', 0.4, [6,7] );
        },
        update: function() {
            // move left or right
            var accel = this.standing ? this.accelGround : this.accelAir;
            if( ig.input.state('left') ) {
                  this.accel.x = -accel;
                  this.flip = true;
            }else if( ig.input.state('right') ) {
                  this.accel.x = accel;
                  this.flip = false;
            }else{
                  this.accel.x = 0;
            }
            // jump
            if( this.standing && ig.input.pressed('jump') ) {
                  this.vel.y = -this.jump;
            }
            // set the current animation, based on the player's speed
            if( this.vel.y < 0 ) {
                this.currentAnim = this.anims.jump;
            }else if( this.vel.y > 0 ) {
                this.currentAnim = this.anims.fall;
            }else if( this.vel.x != 0 ) {
                this.currentAnim = this.anims.run;
            }else{
                this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
            // move!
            this.parent();
        },
        kill: function(){
            this.parent();
            ig.game.spawnEntity( EntityPlayer, this.startPosition.x, 
                this.startPosition.y );
        }
    });
    
});
