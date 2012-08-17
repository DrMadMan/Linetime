ig.module(
    'game.entities.popuptext'
)
    .requires(
    'impact.entity',
    'impact.font'
)
    .defines(function(){

        EntityPopuptext = ig.Entity.extend({
            _wmScalable: true,
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(128, 28, 230, 0.7)',
            text: null,
            animSheet: new ig.AnimationSheet( 'media/textbox.png', 32, 16 ),
            font: new ig.Font( 'media/04b03.font.black.png' ),
            triggered: false,
            gravityFactor: 0,

            size: {x: 8, y: 8},
            init: function(x, y, settings){
                this.parent( x, y, settings);
              this.addAnim('box', 1, [0]);
            },


            update: function(){
                this.parent();
            },
            triggeredBy: function( entity, trigger ) {
                this.triggered = true;
                this.currentAnim = this.anims.box;






            },
            draw: function(){
                this.parent();
            if(this.text != null && this.triggered){
                var wrapper = new WordWrap(this.text,25);

                this.font.draw(wrapper.wrap(), this.pos.x, this.pos.y, ig.Font.ALIGN.CENTER)
            }
            }
        });


    });