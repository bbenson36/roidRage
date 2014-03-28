Asteroids.screens['game-play'] = (function() {
	'use strict';
	
	var mouseCapture = false,
		myMouse = Asteroids.input.Mouse(),
		myKeyboard = Asteroids.input.Keyboard(),
		cancelNextRequest = false,
		moveShip = Asteroids.movement.ShipMovement(),
		myShip = Asteroids.objects.Ship(),
                asteroids = new Array(),
                shotList = new Array(),
		myDrawnBackground = undefined,
		mySpaceShip = undefined,
                roids = undefined,
                shot = undefined,
                shooting = false,
		lastTimeStamp = performance.now(),
		particlesMoney = undefined,
                lastShot = 1;
	
	function initialize() {
		console.log('game initializing...');
		//
		// Have to wait until here to create the texture, because the images aren't
		// loaded and ready until this point.
		
		
		myDrawnBackground = Asteroids.graphics.BackgroundDraw({
			image : Asteroids.images['images/background.png']
		});
		
		mySpaceShip = Asteroids.graphics.ShipDraw({
			image : Asteroids.images['images/ship.png'],
			width : 100, height : 100
		});
                
                roids = Asteroids.graphics.RoidDraw({
			image : Asteroids.images['images/asteroid.png'],
			width : 50, height : 50
		});
                
                shot = Asteroids.graphics.ShotDraw({
			image : Asteroids.images['images/shot.png'],
			width : 50, height : 50
		});
                
                asteroids.push(Asteroids.objects.Asteroid(1));//takes the generation, after hit spawned will have a 2
                asteroids.push(Asteroids.objects.Asteroid(1));
                asteroids.push(Asteroids.objects.Asteroid(2));
                asteroids.push(Asteroids.objects.Asteroid(4));
                
                console.log(asteroids[0].spin);
                
		
		
		myMouse.registerCommand('mousedown',function(e){
			if(myCoins.clicker(e.clientX,e.clientY)){
				particleCount = 10;
				particlesMoney.newPosition({x: e.clientX,
					y: e.clientY});
			}
			});
		//
		// Create the keyboard input handler and register the keyboard commands
		
		
		//not sure why these aren't working
		myKeyboard.registerCommand(KeyEvent.DOM_VK_LEFT, function(){
			console.log('left');
			moveShip.turnLeft(myShip,Asteroids.elapsedTime);
			});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_RIGHT, function(){moveShip.turnRight(myShip,Asteroids.elapsedTime);});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_UP, function(){moveShip.booster(myShip,Asteroids.elapsedTime);});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_A, function(){moveShip.turnLeft(myShip,Asteroids.elapsedTime);});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_D, function(){moveShip.turnRight(myShip,Asteroids.elapsedTime);});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_W, function(){moveShip.booster(myShip,Asteroids.elapsedTime);});
                
                
                myKeyboard.registerCommand(KeyEvent.DOM_VK_SPACE, function(){requestShot(myShip);});
		

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
	

	
	function update(elapsedTime){
            
            lastShot += elapsedTime;
		myKeyboard.update();
                physics.drift(myShip,elapsedTime);
                physics.wrapAround(myShip);
                
                for (var i = 0; i < asteroids.length; i++)
                { 
                    physics.drift(asteroids[i],elapsedTime);
                    physics.wrapAround(asteroids[i]);
                    physics.spin(asteroids[i], elapsedTime);
                }
                
                
                for (var i = 0; i < shotList.length; i++)
                { 
                    physics.drift(shotList[i],elapsedTime);
                    physics.wrapAround(shotList[i]);
                    physics.spin(shotList[i], elapsedTime);
                }
                
		
	}
	
	function render(elapsedTime){
		Asteroids.graphics.clear();
		myDrawnBackground.draw();
		mySpaceShip.draw(myShip);
                
                for (var i = 0; i < asteroids.length; i++)
                { 
                    roids.draw(asteroids[i]);
                }
                
                for (var i = 0; i < shotList.length; i++)
                { 
                    console.log(shotList[i]);
                    shot.draw(shotList[i]);
                }
	}
        
        function collide (elapsedTime){
            
        }
        
        
        function requestShot(gameObject)
        {
            //console.log("requesting shot");
            //console.log("time at request:" + time);
            if(lastShot > 500)
            {
                shotSpawn(gameObject);
                lastShot = 0;
            }
        }
        function shotSpawn(gameObject){
            shotList.push(new Asteroids.objects.Shot(gameObject));
            console.log(shotList[shotList.length-1].rotation);
            
        }
	
	function run() {
		
		
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
