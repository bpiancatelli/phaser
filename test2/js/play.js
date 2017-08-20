var playState = {



	create:function(){
		this.keyboard = game.input.keyboard;

		this.sky = game.add.sprite(0,0,'sky');
				
    	this.platforms = game.add.group();
		this.platforms.enableBody = true;

		this.obstacles = game.add.group();
		this.obstacles.enableBody = true,

		this.ground = this.platforms.create(0, game.world.height - 64, 'ground');
		this.ground.body.immovable = true;
		this.ground.scale.setTo(2, 2);

		var o = [];		
		this.count = 2;

		for (var i = 0; i < this.count; i++){
			o[i] = this.createObstacle();
		}
		this.createPlayer();

		o.forEach(function(e){console.log("obs: " + e.body.x)});
		var xFlag =  o[o.length-1].body.x;
		

		this.win = game.add.sprite(xFlag+2000,game.world.height-150,'win');
		console.log("win: "+ this.win.x);
		game.physics.enable(this.win, Phaser.Physics.ARCADE);
		this.win.body.gravity.y = 200;
		this.win.body.collideWorldBounds = true;		
    	game.physics.arcade.enable(this.win);
	
	},

	update:function(){

		this.obstacles.forEachAlive(function(obs){
			obs.body.velocity.x = -75}
		);

		this.win.body.velocity.x = -75;

		game.physics.arcade.collide(this.win, this.platforms);		
		game.physics.arcade.collide(this.player, this.platforms);
		game.physics.arcade.collide(this.player, this.obstacles);		
		game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);


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

	},

	Win: function(){
		game.state.start('win');
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

	createObstacle: function(){
		
		var width = game.world.randomX+game.world.randomX;
		var height = (game.world.height - 126);

		this.obstacle = this.obstacles.create(width, height ,'obstacle');
		this.obstacle.body.immovable = true;

		return this.obstacle;


	}

}