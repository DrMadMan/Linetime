ig.module( 
	'game.main'
)
.requires(
	'impact.game',
    'game.levels.limbo',
    'game.levels.dorm1',
    'game.levels.dorm2',
    'game.levels.dorm3',
    'game.levels.test1',
    'game.levels.everything_test',
    'game.entities.levelexit',
    'game.entities.levelchange',
    'game.entities.hurt',
    'game.entities.delay',
    'game.entities.mover',
    'game.entities.particle',
    'game.entities.trigger',
    'game.entities.void',
    'game.entities.popuptext',
    'game.entities.bubblespawner',
    'game.entities.spike',
    'game.entities.sign',
	'impact.font',
    'plugins.camera',
    'plugins.notification-manager',
    'impact.timer',
    'impact.debug.debug',
    'plugins.empika.debug_display'
    //,
    //'plugins.webgl-2d'

)
.defines(function(){
        MyGame = ig.Game.extend({
            gravity: 800,


            // Load a font
            instructText: new ig.Font( 'media/04b03.font.png' ),
            statText: new ig.Font( 'media/04b03.font.png'),
            showStats: false,
            statMatte: new ig.Image('media/stat-matte.png'),
            lifeSprite: new ig.Image('media/life-sprite.png'),
            levelTimer: new ig.Timer(),
            levelExit: null,
            stats: {timer: 0, kills: 0, deaths: 0},
            lives: 3,
            newPosition: false,
            myNoteManager: new ig.NotificationManager(),
            

            font: new ig.Font('media/04b03.font.png'),


            init: function() {
                // Initialize your game here; bind keys etc.
                ig.input.bind( ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind( ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind( ig.KEY.UP_ARROW, 'up');
                ig.input.bind( ig.KEY.DOWN_ARROW, 'down');
                ig.input.bind( ig.KEY.X, 'jump');
                ig.input.bind( ig.KEY.C, 'shoot');
                ig.input.bind( ig.KEY.TAB, 'switch' );
                ig.input.bind( ig.KEY.SPACE, 'continue');
                ig.input.bind( ig.KEY.ENTER, 'enter');
                ig.input.bind( ig.KEY.F, 'fly1');
                ig.input.bind( ig.KEY.L, 'fly2');
                ig.input.bind( ig.KEY.Y, 'fly3');

                //ig.music.add( 'media/sounds/testsong1.*');
                //ig.music.volume = 0.5;
                //ig.music.play();

                this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
                this.camera.trap.size.x = ig.system.width/10;
                this.camera.trap.size.y = ig.system.height/3;
                this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
                this.loadLevel( LevelLimbo );
                //this.debugDisplay = new DebugDisplay( this.font );

            },
            loadLevel: function( data ) {
                this.parent( data );
                var levelinfo = this.getEntityByName('levelinfo');
                this.respawnPosition = levelinfo.pos;
                this.stats = {time: 0, kills: 0, deaths: 0};
                this.levelTimer.reset();
                this.player = this.getEntitiesByType( EntityPlayer )[0];
                this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
                this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

                this.camera.set( this.player );
               /** if(this.getEntitiesByType( EntityPlayer ) [0]){
                    this.player = this.getEntitiesByType( EntityPlayer )[0];
                    console.log(this.player + "hello");


                    // Set camera max and reposition trap
                    this.camera.trap.size.x = ig.system.width/10;
                    this.camera.trap.size.y = ig.system.height/3;
                    console.log("Mapped new camera max");

                    this.camera.set( this.player );
                }*/

            },
            gameOver: function(){
                ig.finalStats = ig.game.stats;
                ig.system.setGame(GameOverScreen);

            },
            update: function() {
                var player = this.getEntitiesByType( EntityPlayer )[0];
                this.player = this.getEntitiesByType( EntityPlayer) [0];

                if( player ) {
                    this.camera.follow( this.player );
                    if(player.accel.x > 0 && this.instructText){
                        this.instructText = null;
                    }

                }

                // Update all entities and backgroundMaps

                this.parent();
                this.myNoteManager.update();



                // Add your own, additional update code here
            },

            draw: function() {
                // Draw all entities and backgroundMaps
                this.parent();
                    var x = ig.system.width/ 2;
                    var y = ig.system.height/2;
                    //this.statText.draw('Left/Right Moves, X Jumps. C Fires and Tab switches weapons.', x, y, ig.Font.ALIGN.CENTER);
                   

                if(this.showStats){
                    this.statMatte.draw(0,0);
                    var x = ig.system.width/2;
                    var y = ig.system.height/2 - 20;
                    this.statText.draw('Level Complete', x, y, ig.Font.ALIGN.CENTER);
                    this.statText.draw('Time: ' + this.stats.time, x, y+30, ig.Font.ALIGN.CENTER);
                    this.statText.draw('Kills: ' + this.stats.kills, x, y+40, ig.Font.ALIGN.CENTER);
                    this.statText.draw('Deaths: ' + this.stats.deaths, x, y+50, ig.Font.ALIGN.CENTER);
                    this.statText.draw('Press spacebar to continue. ', x, y+60, ig.Font.ALIGN.CENTER);

                }
                this.myNoteManager.draw();
                /**this.statText.draw("Lives", 5,5);
                for(var i=0; i < this.lives; i++){
                    this.lifeSprite.draw(((this.lifeSprite.width +2) * i)+ 5, 15);
                }*/






            },
            toggleStats: function(levelExit){
                this.showStats = true;
                this.stats.time = Math.round(this.levelTimer.delta());
                this.levelExit = levelExit;
            }




        });
        StartScreen = ig.Game.extend({
            instructText: new ig.Font( 'media/04b03.font.png' ),
            background: new ig.Image('media/screen-bg.png'),
            mainCharacter: new ig.Image('media/screen-main-character.png'),
            title: new ig.Image('media/game-title.png'),
            init: function() {
                ig.input.bind(ig.KEY.SPACE, 'start');
            },
            update: function(){
                if(ig.input.pressed ('start')){
                    ig.system.setGame(MyGame)
                }
                this.parent();
            },
            draw: function() {
                this.parent();
                this.background.draw(0,0);
                this.mainCharacter.draw(0,0);
                this.title.draw(ig.system.width - this.title.width, 0);
                var x = ig.system.width/ 2,
                    y = ig.system.height - 10;
                this.instructText.draw( 'Press Spacebar To Start', x+40, y, ig.Font.ALIGN.CENTER );

            }
        });
        GameOverScreen = ig.Game.extend({
            instructText: new ig.Font( 'media/04b03.font.png' ),
            background: new ig.Image( 'media/screen-bg.png' ),
            gameOver: new ig.Image( 'media/game-over.png' ),
            stats: {},
            init: function(){
                ig.input.bind( ig.KEY.SPACE, 'start');
                this.stats = ig.finalStats;
            },
            update: function(){
                if(ig.input.pressed('start')){
                    ig.system.setGame(StartScreen)
                }
                this.parent();

            },
            draw: function(){
                this.parent();
                this.background.draw(0,0);
                var x = ig.system.width/2;
                var y = ig.system.height/2 - 20;
                this.gameOver.draw( x - (this.gameOver.width *.5), y -30);
                var score = (this.stats.kills * 100) - (this.stats.deaths * 50);
                this.instructText.draw('Total Kills: ' + this.stats.kills , x, y+30, ig.Font.ALIGN.CENTER);
                this.instructText.draw('Total Deaths: ' + this.stats.deaths, x, y+40, ig.Font.ALIGN.CENTER);
                this.instructText.draw('Total Score: ' + score, x, y+50, ig.Font.ALIGN.CENTER);
                this.instructText.draw('Press spacebar to continue', x, ig.system.height - 10, ig.Font.ALIGN.CENTER);

            }

        });
        WordWrap = ig.Class.extend({

            text:"",
            maxWidth:100,
            cut: false,

            init:function (text, maxWidth, cut) {
                this.text = text;
                this.maxWidth = maxWidth;
                this.cut = cut;
            },

            wrap:function(){
                var regex = '.{1,' +this.maxWidth+ '}(\\s|$)' + (this.cut ? '|.{' +this.maxWidth+ '}|.+$' : '|\\S+?(\\s|$)');
                return this.text.match( RegExp(regex, 'g') ).join( '\n' );
            }

        });

        var wrapper = new WordWrap('some length text',25);
        wrapper.wrap();





// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 480, 320, 3 );

});
