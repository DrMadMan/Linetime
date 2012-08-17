ig.module(
	'game.entities.sign'
)
.requires(
	'impact.entity',
	'impact.font',
	'plugins.notification-manager'
)
.defines(function(){
	
EntitySign = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255, 0, 0, 0.7)',

	collides: ig.Entity.COLLIDES.NEVER,
    checkAgainst: ig.Entity.TYPE.A,

	size: {x: 20, y: 20},
	damage: 10,
	font: new ig.Font( 'media/04b03.font.png'),
	animSheet: new ig.AnimationSheet( 'media/LimboSign.png', 20, 20 ),
	drawText: false,


	init: function( x, y, settings ){
		this.addAnim( 'idle', 1, [0] );
		this.parent( x, y, settings );
	},
	
	/* triggeredBy: function( entity, trigger ) {	
		font.draw( text, (this.x + 10), this.y);		
	}, **/

	check: function( other ){
		//this.drawText = true;
		ig.game.myNoteManager.spawnWordBalloon(this, this.font,
                                        this.text ,this.pos.x,this.pos.y,
                                        {vel: { x: 0, y: -30 },  alpha: 1, lifetime: 3.2, fadetime: 1.0 });
        
		//ig.game.myNoteManager.spawn(this.font, this.text, x, y, {vel: { x: 0, y: 0 },  alpha: 1, lifetime: 2.2, fadetime: 0.3 });
		
	},
	
	update: function(){
		this.currentAnim = this.anims.idle;
		this.parent();
	}
});

});