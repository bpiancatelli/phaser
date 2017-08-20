var loadState = {
	preload: function(){
		var loadingLabel = game.add.text(80,150,'loading ...',{font:'30px Courier',fill:'#ffffff'});

		game.load.image('sky','assets/sky.png');
		game.load.image('obstacle','assets/obstacle.png');
		game.load.image('ground','assets/platform.png');
		game.load.image('win','assets/win.png');
		game.load.spritesheet('ball','assets/pokeball.png', 48, 48);

	},

	create: function(){
		game.state.start('menu');
	}
}