var Asteroids = {
	images : {},
	screens : {},
	score : 0,
	elapsedTime : 0,
	size : {width : 900, height : 900},
	curScore : 0,
	status : {
		preloadRequest : 0,
		preloadComplete : 0
	}
};

//------------------------------------------------------------------
//
// Wait until the browser 'onload' is called before starting to load
// any external resources.  This is needed because a lot of JS code
// will want to refer to the HTML document.
//
//------------------------------------------------------------------
window.addEventListener('load', function() {
	console.log('Loading resources...');
	Modernizr.load([
		{
			load : [
			    //images
			    'preload!images/background.png',
			    'preload!images/ship.png',
			    'preload!images/asteroidSmoke.png',
			    'preload!images/asteroidSpark.png',
			    'preload!images/thrusterSmoke.png',
			    'preload!images/thrusterSpark.png',
                            'preload!images/explosionSmoke.png',
			    'preload!images/explosionSpark.png',
                            'preload!images/asteroid.png',
                            'preload!images/ufo.png',
                            'preload!images/shot.png',
			    //libs
			    'preload!libs/physics.js',
			    'preload!libs/random.js',
			    //gameEngine
			    'prelaod!gameEngine/input.js',    
			    'preload!gameEngine/renderer.js',
			    'preload!gameEngine/particle-system.js',
			    'preload!gameEngine/ai.js',
			    'preload!gameEngine/collision.js',
			    'preload!gameEngine/dataPersistence.js',
			    'preload!gameEngine/objects.js',
			    'prelaod!gameEngine/movement.js',
			    'prelaod!gameEngine/sounds.js',
			    //gameScripts
			    'preload!gameScripts/scoring.js',
			    'preload!gameScripts/mainmenu.js',
			    'preload!gameScripts/gameplay.js',
				'preload!gameScripts/game.js'
			],
			complete : function() {
				console.log('All files requested for loading...');
			}
		}
	]);
}, false);

//
// Extend yepnope with our own 'preload' prefix that...
// * Tracks how many have been requested to load
// * Tracks how many have been loaded
// * Places images into the 'images' object
yepnope.addPrefix('preload', function(resource) {
	console.log('preloading: ' + resource.url);
	
	Asteroids.status.preloadRequest += 1;
	var isImage = /.+\.(jpg|png|gif)$/i.test(resource.url);
	resource.noexec = isImage;
	resource.autoCallback = function(e) {
		if (isImage) {
			var image = new Image();
			image.src = resource.url;
			Asteroids.images[resource.url] = image;
		}
		Asteroids.status.preloadComplete += 1;
		
		//
		// When everything has finished preloading, go ahead and start the game
		if (Asteroids.status.preloadComplete === Asteroids.status.preloadRequest) {
			console.log('Preloading complete!');
			Asteroids.game.initialize();
		}
	};
	
	return resource;
});
