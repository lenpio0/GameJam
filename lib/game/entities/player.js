ig.module(
      'game.entities.player'
)
.requires(
      'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/dino.png', 32, 32 ),
        size: {x: 32, y: 32},
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
            this.addAnim( 'run', 0.07, [0,1] );
            this.addAnim( 'jump', 1, [2] );
            this.addAnim( 'fall', 0.4, [4,3] );
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
                  this.jumpSound = new ig.Sound("media/jump.*");

                  this.jumpSound.play();
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
            var x = this.startPosition.x;
            var y = this.startPosition.y;
            var game = ig.game;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y,
            {callBack:function(){ if (game.coins < 5) {ig.game.spawnEntity( EntityPlayer, x, y)}}} );
        },
        finalkill: function(){
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y)
        }
    });
    EntityDeathExplosion = ig.Entity.extend({
        lifetime: 1,
        callBack: null,
        particles: 25,
        init: function( x, y, settings ) {
              this.parent( x, y, settings );
              for(var i = 0; i < this.particles; i++)
                   ig.game.spawnEntity(EntityDeathExplosionParticle, x, y,
                   {colorOffset: settings.colorOffset ? settings.colorOffset : 0});
                   this.idleTimer = new ig.Timer();
        },
        update: function() {
              if( this.idleTimer.delta() > this.lifetime ) {
                   this.kill();
                   if(this.callBack)
                         this.callBack();
                   return;
              }
        }
    });
    EntityDeathExplosionParticle = ig.Entity.extend({
        size: {x: 2, y: 2},
        maxVel: {x: 160, y: 200},
        lifetime: 2,
        fadetime: 1,
        bounciness: 0,
        vel: {x: 100, y: 30},
        friction: {x:100, y: 0},
        collides: ig.Entity.COLLIDES.LITE,
        colorOffset: 0,
        totalColors: 7,
        animSheet: new ig.AnimationSheet( 'media/blood.png', 2, 2 ),
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            var frameID = Math.round(Math.random()*this.totalColors) + 
            (this.colorOffset * (this.totalColors+1));
            this.addAnim( 'idle', 0.2, [frameID] );
            this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
            this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
            this.idleTimer = new ig.Timer();
        },
        update: function() {
            if( this.idleTimer.delta() > this.lifetime ) {
                this.kill();
                return;
            }
            this.currentAnim.alpha = this.idleTimer.delta().map(
                this.lifetime - this.fadetime, this.lifetime,
                1, 0
            );
            this.parent();
        }
    });
    
});
