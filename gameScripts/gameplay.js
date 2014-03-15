Asteroids.screens['game-play'] = (function() {
	'use strict';
	
	var mouseCapture = false,
		myMouse = Asteroids.input.Mouse(),
		myKeyboard = Asteroids.input.Keyboard(),
		cancelNextRequest = false,
		myCountDown = undefined,
		myDrawnCoins = undefined,
		myDrawnBackground = undefined,
		myDrawnPig = undefined,
		myDrawnScore = undefined,
		lastTimeStamp = performance.now(),
		myCoins = Asteroids.coins.Coins(),
		level = 1,
		countdown = 1,
		init = true,
		finished = false,
		lose = false,
		end = false,
		totalScore = 0,
		score = 0,
		scoreFinished = {finished: false,
						score: 0},
		particleCount = 0,
		particlesMoney = undefined,
		myTime = Asteroids.input.Time(),
		sizes = {usSize : 0.06,
		roSize : 0.03,
		caSize : 0.10,
		clSize : 0.03};
	
	function initialize() {
		console.log('game initializing...');
		//
		// Have to wait until here to create the texture, because the images aren't
		// loaded and ready until this point.
		
		
		myDrawnBackground = Asteroids.graphics.BackgroundDraw({
			image : Asteroids.images['images/Background.png']
		});
		
		myDrawnPig = Asteroids.graphics.PigDraw({
			pigIm : Asteroids.images['images/Piggy-Bank.png']
		});
		
		myCountDown = Asteroids.graphics.CountDraw({
			font : '64px Arial, sans-serif',
			fill : 'yellow',
			stroke : 'red'
		});
		
		myDrawnCoins = Asteroids.graphics.CoinDraw({
			usIm : Asteroids.images['images/Coin-US-Dollar.png'],
			roIm : Asteroids.images['images/Coin-Roman.png'],
			caIm : Asteroids.images['images/caCoin.png'],
			clIm : Asteroids.images['images/Clock.png'],
			usSize : sizes.usSize,
			roSize : sizes.roSize,
			caSize : sizes.caSize,
			clSize : sizes.clSize
		});
		
		
		particlesMoney = Asteroids.particleSystem( {
			image : Asteroids.images['images/Dollar-Sign.png'],
			center: {x: 300, y: 300},
			speed: {mean: 50, stdev: 25},
			lifetime: {mean: 4,stdev: 1}
			},
			Asteroids.graphics
		);
		
		myDrawnScore = Asteroids.graphics.ScoreDraw({
			font : '32px Arial, sans-serif',
			fill : 'red',
			stroke : 'green'
		});
		
		myMouse.registerCommand('mousedown',function(e){
			if(myCoins.clicker(e.clientX,e.clientY)){
				particleCount = 10;
				particlesMoney.newPosition({x: e.clientX,
					y: e.clientY});
			}
			});
		//
		// Create the keyboard input handler and register the keyboard commands

		myKeyboard.registerCommand(KeyEvent.DOM_VK_ESCAPE, function() {
			//
			// Stop the game loop by canceling the request for the next animation frame
			cancelNextRequest = true;
			//
			// Then, return to the main menu
			Asteroids.game.showScreen('main-menu');
		});
	}
	
	//------------------------------------------------------------------
	//
	// This is the Game Loop function!
	//
	//------------------------------------------------------------------
	function gameLoop(time) {
		Asteroids.elapsedTime = time - Asteroids.lastTimeStamp;
		Asteroids.lastTimeStamp = time;
		update(Asteroids.elapsedTime);
		render(Asteroids.elapsedTime);
		if(!cancelNextRequest){
			requestAnimationFrame(gameLoop);
		}
	}
	
	var seconds = 0;
	
	function add(key, value) {
		localStorage[key] = value;
	}
	
	function remove(key) {
		localStorage.removeItem(key);
	}
	
	function update(elapsedTime){
		if(finished){
			totalScore += score;
			add(level-1,score);
			if(score >= 100 && level<4){
				init = true,
				level++;
				finished = false;
				score = 0;
			}
			else if(level>3){
				end = true;
			}
			else{
				lose = true;
			}
		}
		else{
		
			if(init){
				myCoins.initLevel(level,sizes);
				init = false;
				countdown = 4;
			}
			
			seconds += elapsedTime/1000;
			
			if(countdown >0 ){
				if(seconds >= 1){
					countdown--;
					seconds = 0;
				}
			}
			else{
				myKeyboard.update(elapsedTime);
				myMouse.update(elapsedTime);
				
				if(particleCount >0){
					particlesMoney.create();
					particlesMoney.create();
					particlesMoney.create();
					particleCount--;
				}
				
				particlesMoney.update(elapsedTime/1000);
				
				scoreFinished = myCoins.update(elapsedTime,score);
				finished = scoreFinished.finished;
				score = scoreFinished.score;
			}
		}
		
		
		
	}
	
	function render(elapsedTime){
		Asteroids.graphics.clear();
		myDrawnBackground.draw();
		if(lose){
			cancelNextRequest = true;
			//
			// Then, return to the main menu
			Asteroids.game.showScreen('main-menu');
		}
		else if (end){
			cancelNextRequest = true;
			//
			// Then, return to the main menu
			Asteroids.game.showScreen('main-menu');
		}
		else if(countdown == 0){
			myDrawnScore.draw(score);
			myDrawnCoins.draw(myCoins);
			myDrawnPig.draw();
			particlesMoney.render();
		}
		else{
			myCountDown.draw(countdown);
		}
	}
	
	function run() {
		
		//Start Timer
		myTime.startTime();
		
		Asteroids.lastTimeStamp = performance.now();
		//
		// Start the animation loop
		cancelNextRequest = false;
		requestAnimationFrame(gameLoop);
	}
	
	return {
		initialize : initialize,
		run : run
	};
}());
