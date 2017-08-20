var playState = {
	create:function(){
		this.keyboard = game.input.keyboard;

		this.sky = game.add.sprite(0,0,'sky');
		
		this.player = game.add.sprite(16,16,'ball');
		game.physics.enable(this.player, Phaser.Physics.ARCADE);

		this.player.animations.add('left', [0, 1], 10, true);
    	this.player.animations.add('right', [2,3], 10, true);

		this.win = game.add.sprite(50,160,'dude');
		game.physics.enable(this.win, Phaser.Physics.ARCADE);	



	},

	update:function(){
		this.moveWin();		

		game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);

		if (this.keyboard.isDown(Phaser.Keyboard.Q)) {
			this.player.body.velocity.x = -175;
			this.player.animations.play('left');
		}else if(this.keyboard.isDown(Phaser.Keyboard.D)){
			this.player.body.velocity.x = 175;
			this.player.animations.play('right');
		}else{
			this.player.body.velocity.x = 0;
		}

		if (this.keyboard.isDown(Phaser.Keyboard.Z)) {
			this.player.body.velocity.y = -175;
			this.player.frame=0;
		}else if (this.keyboard.isDown(Phaser.Keyboard.S)) {
			this.player.body.velocity.y = 175;
			this.player.frame=0;
		}else{
			this.player.body.velocity.y = 0;
			this.player.frame=0;
		}

	},

	Win: function(){
		game.state.start('win');
	},

	moveWin: function(){

		cardinal = Math.floor((Math.random() * 4) + 1);
		// console.log(game.world.height); // 480
		// console.log(game.world.width); // 640
		curX = this.win.world.x;
		curY = this.win.world.y;

		if (cardinal == 1 && curX > 0) {
			this.win.body.velocity.x = -400;
		}else if (cardinal == 2 && curX < game.world.width) {
			this.win.body.velocity.x = 400;
		}else if (cardinal == 3 && curY < game.world.height){
			this.win.body.velocity.y = -400;
		}else if(cardinal == 4 && curY > 0){
			this.win.body.velocity.y = 400;
		}
		


		
	}
}