Asteroids.screens['game-play'] = (function() {
	'use strict';
	
	var mouseCapture = false,
		myMouse = Asteroids.input.Mouse(),
		myKeyboard = Asteroids.input.Keyboard(),
		cancelNextRequest = false,
		moveShip = Asteroids.movement.ShipMovement(),
		myShip = Asteroids.objects.Ship(),
		smallUFO = Asteroids.objects.UFOSmall(),
		bigUFO = Asteroids.objects.UFOBig(),
        asteroids = Asteroids.objects.AsteroidList(),
        shotList = Asteroids.objects.ShotList(),
        collisions = Asteroids.collision.CollisionDetection(),
		myDrawnBackground = undefined,
		mySpaceShip = undefined,
		myDrawnBigUFO = undefined,
		myDrawnSmallUFO = undefined,
        roids = undefined,
        shot = undefined,
        shooting = false,
		lastTimeStamp = performance.now(),
		thrusterParticles1 = undefined,
		asterParticles1 = undefined,
		shipBoomParticles1 = undefined,
		thrusterParticles2 = undefined,
		asterParticles2 = undefined,
		shipBoomParticles2 = undefined,
		thrusterCount = 0,
        lastShot = 1;
                
                
            var toSpawn = 4;
	
	function initialize() {
		console.log('game initializing...');
		
		myShip.posX = 0.5 * Asteroids.size.width;
		myShip.posY = 0.5 * Asteroids.size.height;
		
		//thruster flame
		thrusterParticles1 = Asteroids.particleSystem ({
			image : Asteroids.images['images/thrusterParticles1.png'],
			center: {x: 0, y: 0},
			sizeMed: 3,
			sizeStd: 1,
			speed: {mean: 100, stdev: 25},
			lifetime: {mean: 1, stdev: .5}
			},
			Asteroids.graphics
		);
		//number to be generated per action event
		thrusterParticles1.count = 5;
		
		//thruster smoke
		thrusterParticles2 = Asteroids.particleSystem ({
			image : Asteroids.images['images/thrusterParticles2.png'],
			center: {x: 0, y: 0},
			sizeMed: 3,
			sizeStd: 1,
			speed: {mean: 100, stdev: 25},
			lifetime: {mean: 1, stdev: .5}
			},
			Asteroids.graphics
		);
		thrusterParticles2.count =5;
		
		//asteroid flame
		asterParticles1 = Asteroids.particleSystem({
			image : Asteroids.images['images/asterParticles1.png'],
			center: {x: 0, y: 0},
			sizeMed: 3,
			sizeStd: 1,
			speed: {mean: 100, stdev: 25},
			lifetime: {mean: 1, stdev: .5}
			},
			Asteroids.graphics
		);
		asterParticles1.count = 50;
		
		//asteroid bits
		asterParticles2 = Asteroids.particleSystem({
			image : Asteroids.images['images/asterParticles2.png'],
			center: {x: 0, y: 0},
			sizeMed: 3,
			sizeStd: 1,
			speed: {mean: 100, stdev: 25},
			lifetime: {mean: 1, stdev: .5}
			},
			Asteroids.graphics);
		asterParticles2.count = 50;
		
		//ship flame
		shipBoomParticles1 = Asteroids.particleSystem({
			image : Asteroids.images['images/shipParticles1.png'],
			center: {x: 0, y: 0},
			sizeMed: 3,
			sizeStd: 1,
			speed: {mean: 100, stdev: 25},
			lifetime: {mean: 3, stdev: .5}
			},
			Asteroids.graphics);
		shipBoomParticles1.count = 150;
		//ship bits
		shipBoomParticles2 = Asteroids.particleSystem({
			image : Asteroids.images['images/shipParticles2.png'],
			center: {x: 0, y: 0},
			sizeMed: 3,
			sizeStd: 1,
			speed: {mean: 100, stdev: 25},
			lifetime: {mean: 3, stdev: .5}
			},
			Asteroids.graphics);
		shipBoomParticles2.count = 150;
		
		
		myDrawnBackground = Asteroids.graphics.BackgroundDraw({
			image : Asteroids.images['images/background.png']
		});
		
		myDrawnBigUFO = Asteroids.graphics.ShipDraw({
			image : Asteroids.images['images/ufo.png'],
			width : smallUFO.width, height : bigUFO.height
		});
		
		myDrawnSmallUFO = Asteroids.graphics.ShipDraw({
			image : Asteroids.images['images/ufo.png'],
			width : smallUFO.width, height : smallUFO.height
		});
		
		mySpaceShip = Asteroids.graphics.ShipDraw({
			image : Asteroids.images['images/ship.png'],
			width : myShip.width, height : myShip.height
		});
                
        roids = Asteroids.graphics.RoidDraw({
			image : Asteroids.images['images/asteroid.png']
		});
                
        shot = Asteroids.graphics.ShotDraw({
			image : Asteroids.images['images/shot.png']
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
        
        for (var i = 0; i < shotList.list.length; i++){ 
            physics.drift(shotList.list[i],elapsedTime);
            physics.wrapAround(shotList.list[i]);

            shotList.list[i].age += elapsedTime;

         }
		
        //check for collisons now that everything has been moved
        collisions.handleCollisions(myShip, asteroids);
        collisions.handleCollisions(shotList, asteroids);
        
        
      //ship thruster particles
        myShip.addParticles(thrusterParticles1);
        thrusterParticles1.update(elapsedTime/1000);
        myShip.addParticles(thrusterParticles2);
        thrusterParticles2.update(elapsedTime/1000);
        //asteroid particles
        asteroids.addParticles(asterParticles1);
        asterParticles1.update(elapsedTime/1000);
        asteroids.addParticles(asterParticles2);
        asterParticles2.update(elapsedTime/1000);
        //ship explosions?
        //myShip.addParticles(thrusterParticles1);
        //thrusterParticles1.update(elapsedTime/1000);
        
        
        
        shotList.removeDead();
        asteroids.handleHits();
	}
	
	function render(elapsedTime){
		Asteroids.graphics.clear();
		myDrawnBackground.draw();
		thrusterParticles1.render();
		thrusterParticles2.render();
		asterParticles1.render();
		asterParticles2.render();
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
