var loadState = {
	preload: function(){
		var loadingLabel = game.add.text(80,150,'loading ...',{font:'30px Courier',fill:'#ffffff'});

		game.load.image('sky','assets/sky.png');
		game.load.spritesheet('ball','assets/pokeball.png', 48, 48);
		game.load.spritesheet('dude','assets/dude.png', 32, 48);

	},

	create: function(){
		game.state.start('menu');
	}
}