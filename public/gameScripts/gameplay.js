Asteroids.screens['game-play'] = (function() {
	'use strict';
	
	var mouseCapture = false,
		myMouse = Asteroids.input.Mouse(),
		myKeyboard = Asteroids.input.Keyboard(),
		cancelNextRequest = false,
		moveShip = Asteroids.movement.ShipMovement(),
		myShip = Asteroids.objects.Ship(),
        asteroids = Asteroids.objects.AsteroidList(),
        shotList = Asteroids.objects.ShotList(),
        collisions = Asteroids.collision.CollisionDetection(),
		myDrawnBackground = undefined,
		mySpaceShip = undefined,
        roids = undefined,
        shot = undefined,
        shooting = false,
		lastTimeStamp = performance.now(),
		thrusterParticles = undefined,
		thrusterCount = 0,
        lastShot = 1;
                
                
            var toSpawn = 1;
	
	function initialize() {
		console.log('game initializing...');
		
		myShip.posX = 0.5 * Asteroids.size.width;
		myShip.posY = 0.5 * Asteroids.size.height;
		
		//
		// Have to wait until here to create the texture, because the images aren't
		// loaded and ready until this point.
		thrusterParticles = Asteroids.particleSystem ({
			image : Asteroids.images['images/thruster.png'],
			center: {x: 0, y: 0},
			speed: {mean: 100, stdev: 25},
			lifetime: {mean: 1, stdev: .5}
			},
			Asteroids.graphics
		);
		
		myDrawnBackground = Asteroids.graphics.BackgroundDraw({
			image : Asteroids.images['images/background.png']
		});
		
		mySpaceShip = Asteroids.graphics.ShipDraw({
			image : Asteroids.images['images/ship.png'],
			width : myShip.width, height : myShip.height
		});
                
                roids = Asteroids.graphics.RoidDraw({
			image : Asteroids.images['images/asteroid.png'],
			width : 50, height : 50
		});
                
                shot = Asteroids.graphics.ShotDraw({
			image : Asteroids.images['images/shot.png'],
			width : 50, height : 50
		});
                
                /*asteroids.push(Asteroids.objects.Asteroid(1));//takes the generation, after hit spawned will have a 2
                asteroids.push(Asteroids.objects.Asteroid(1));
                asteroids.push(Asteroids.objects.Asteroid(2));
                asteroids.push(Asteroids.objects.Asteroid(4));*/
                
                for(var i = 0; i < toSpawn; ++i)
                {
                    asteroids.list.push(Asteroids.objects.Asteroid(1));
                }
                
                console.log(asteroids.list[0].spin);
                
		
		
		myMouse.registerCommand('mousedown',function(e){
			});
		//
		// Create the keyboard input handler and register the keyboard commands
		
		
		//not sure why these aren't working
		myKeyboard.registerCommand(KeyEvent.DOM_VK_LEFT, function(){
			//console.log('left');
			moveShip.turnLeft(myShip,Asteroids.elapsedTime);
			});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_RIGHT, function(){moveShip.turnRight(myShip,Asteroids.elapsedTime);});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_UP, function(){moveShip.booster(myShip,Asteroids.elapsedTime);});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_A, function(){moveShip.turnLeft(myShip,Asteroids.elapsedTime);});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_D, function(){moveShip.turnRight(myShip,Asteroids.elapsedTime);});
		myKeyboard.registerCommand(KeyEvent.DOM_VK_W, function(){moveShip.booster(myShip,Asteroids.elapsedTime);});
                
                
                myKeyboard.registerCommand(KeyEvent.DOM_VK_V, function(){requestShot(myShip);});
		

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
        
        for (var i = 0; i < asteroids.list.length; i++)
        { 
            physics.drift(asteroids.list[i],elapsedTime);
            physics.wrapAround(asteroids.list[i]);
            physics.spin(asteroids.list[i], elapsedTime);
        }
        
        
      //creating ship boost particles
        if(myShip.isBoosting){
        	thrusterCount +=3;
        	myShip.isBoosting = false;
        }
        thrusterParticles.newPosition({
        		x: myShip.posX, 
        		y: myShip.posY
        		});
        thrusterParticles.newDirection(myShip.rotation);
        //essentially this creates 3 particles every loop
        if(thrusterCount > 0){
        	thrusterParticles.create();
        	thrusterParticles.create();
        	thrusterParticles.create();
        	thrusterCount-=3;
        }
        
        thrusterParticles.update(elapsedTime/1000);
        
        for (var i = 0; i < shotList.list.length; i++){ 
            physics.drift(shotList.list[i],elapsedTime);
            physics.wrapAround(shotList.list[i]);

            shotList.list[i].age += elapsedTime;

         }
		
        //check for collisons now that everything has been moved
        collisions.handleCollisions(myShip, asteroids);
        collisions.handleCollisions(shotList, asteroids);
        shotList.removeDead();
        asteroids.handleHits();
	}
	
	function render(elapsedTime){
		Asteroids.graphics.clear();
		myDrawnBackground.draw();
		thrusterParticles.render();
		mySpaceShip.draw(myShip);
                
        for (var i = 0; i < asteroids.list.length; i++)
        { 
            roids.draw(asteroids.list[i]);
        }
        if(typeof shotList.list !== 'undefined')
        {
            for (var i = 0; i < shotList.list.length; i++)
            { 
                shot.draw(shotList.list[i]);
            }
        }
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
            //console.log(shotList.list);
            //asteroids.list.push(Asteroids.objects.Asteroid(1));
            shotList.list.push(new Asteroids.objects.Shot(gameObject));
            //console.log(shotList.list[shotList.list.length-1].rotation);
            
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
