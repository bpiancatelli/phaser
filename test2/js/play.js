var playState = {

	create:function(){
		
		this.createBackGround();
		this.createPlayer();
		this.createFlag();
		
	},

	update:function(){		
		this.obstacles.forEachAlive(function(obs){
			obs.body.velocity.x = -75}
		);

		this.flag.body.velocity.x = -75;

		game.physics.arcade.collide(this.flag, this.platforms);		
		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.player, this.obstacles);		
		game.physics.arcade.overlap(this.player, this.flag, this.Win, this.levelUp, this);


		if (this.keyboard.isDown(Phaser.Keyboard.Q)) {
			this.player.body.velocity.x = -175;
			this.player.animations.play('left');
		}else if(this.keyboard.isDown(Phaser.Keyboard.D)){
			this.player.body.velocity.x = 175;
			this.player.animations.play('right');
		}else {
			this.player.frame = 0;
			this.player.animations.stop();
			this.player.body.velocity.x = 0;
		}	

		if(this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.player.body.touching.down){
			this.player.body.velocity.y = -175;
		}

		// console.log(game.level);
	},

	Win: function(){		
		game.state.start('win');
	},

	levelUp: function(){
		if (this.level == 1) {return true;}
	},

	createBackGround: function(){
		
		this.keyboard = game.input.keyboard;

		this.sky = game.add.sprite(0,0,'sky');
				
    	this.platforms = game.add.group();
		this.platforms.enableBody = true;

		this.obstacles = game.add.group();
		this.obstacles.enableBody = true,
		this.ground = this.platforms.create(0, game.world.height - 64, 'ground');
		this.ground.body.immovable = true;
		this.ground.scale.setTo(2, 2);

	},

	createPlayer: function(){

		this.player = game.add.sprite(16,game.world.height-150,'ball');
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.animations.add('left', [0, 1], 10, true);
    	this.player.animations.add('right', [2, 3], 10, true);	
		this.player.body.gravity.y = 200;
		this.player.body.collideWorldBounds = true;
    	game.physics.arcade.enable(this.player);

	},

	createFlag: function(){

		var o = [];
		this.count = 2;
		// create a certain number of obstacle
		for (var i = 0; i < this.count; i++){
			o[i] = this.createObstacle();
		}
		
		// take the abscissa of the last obstacle
		// adding a random value
		// the flag will be after the last obstacle
		var xFlag =  o[o.length-1].body.x;
		xF = xFlag+20;

		this.flag = game.add.sprite(xF, game.world.height-110, 'flag');
		game.physics.enable(this.flag, Phaser.Physics.ARCADE);
    	this.flag.body.immovable=true;

	},

	createObstacle: function(){
		
		var width = game.world.randomX+game.world.randomX;
		var height = (game.world.height - 126);

		this.obstacle = this.obstacles.create(width, height ,'obstacle');
		this.obstacle.body.immovable = true;

		return this.obstacle;


	}

}