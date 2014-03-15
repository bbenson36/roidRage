var Asteroids = {
	images : {},
	screens : {},
	score : 0,
	elapsedTime : 0,

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
			    'prelaod!gameEngine/input.js',
			    'preload!gameEngine/renderer.js',
			    'preload!gameScripts/mainmenu.js',
			    'preload!gameScriptscripts/gameplay.js',
			    'preload!gameScriptscripts/help.js',
			    'preload!gameEngine/particle-system.js',
			    'preload!gameEngine/random.js',
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
