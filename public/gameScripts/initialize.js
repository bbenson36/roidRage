//------------------------------------------------------------------
//
// This function performs the one-time game initialization.
//
//------------------------------------------------------------------
Asteroids.initialize = (function initialize(graphics, images, input) {
	'use strict';

	var	elapsedTime = 0,
		lastTimeStamp = performance.now(),
		myKeyboard = input.Keyboard(),
		myMouse = input.Mouse(),
		myTime = input.Time();

	function gameLoop(time) {
		elapsedTime = time - lastTimeStamp;
		lastTimeStamp = time;
		update(elapsedTime);
		render(elapsedTime);
		requestAnimationFrame(gameLoop);
	}
	
	function update(elapsedTime){
		myKeyboard.update(elapsedTime);
		myTime.update(elapsedTime);
	}
	
	function render(elapsedTime){
		graphics.clear();
		myDrawnBackground.draw();
	}

	return function() {
		console.log('game initializing...');
		//
		// Have to wait until here to create the texture, because the images aren't
		// loaded and ready until this point.
		
		
		myDrawnBackground = graphics.BackgroundDraw({
			image : Asteroids.images['images/background.jpg']
		});
		
		
		//
		// Create the keyboard input handler and register the keyboard commands
		
		//Start Timer
		myTime.startTime();
		
		requestAnimationFrame(gameLoop); 
	};
}(Asteroids.graphics, Asteroids.images, Asteroids.input));