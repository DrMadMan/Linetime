ig.module(
    'game.entities.bubblespawner'
).
    requires(
    'impact.entity',
    'impact.image'


).
    defines(function(){
        EntityBubblespawner = ig.Entity.extend({
            size: {x: 4, y: 4},
            //something to commit
            text: "",
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(196, 255, 0, 0.7)',
            imageDir: null,
            time: 5,
            drawBox: false,
            msgTime: new ig.Timer(),
            bubbleTexture: null,
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,
            init: function(x,y,settings)
            {
                this.parent(x,y,settings);
                this.bubbleTexture = new ig.Image(this.imageDir);
            },
            triggeredBy: function( entity, trigger ) {

                this.drawBox = true;
                this.msgTime.set(this.time);
            },
            update: function(){
                ig.show( 'Draw', this.draw );
                this.parent();
            },
            draw: function(){
                //ig.game.debugDisplay.draw([this.drawBox.toString()], false, false, 10000, 100);
                if(this.msgTime){
                    if(this.msgTime.delta() > 0)
                    {
                        this.drawBox = false;
                    }
                }

                this.parent;
                if(this.drawBox){
                    this.bubbleTexture.draw(this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y);
                }


            }
        });


    });