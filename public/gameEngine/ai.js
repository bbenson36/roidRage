Asteroids.ai = (function(){
	
	function AI (ship,asteroids,bigUFO,smallUFO,ufoShots,collisions,movement){
		var that = {
				test : 0
		};
		
		that.initMove = function (elapsedTime){
			movement.turnLeft(ship,elapsedTime);
			movement.booster(ship,elapsedTime);
		};
		
		that.nextMove = function(elapsedTime){
			var ship2 = new Asteroids.objects.Ship(),
			asteroids2 = new Asteroids.objects.AsteroidList(),
			ufoShots2 = new Asteroids.objects.ShotList(),
			bigUFO2 = new Asteroids.objects.UFOBig,
			smallUFO2 = new Asteroids.objects.UFOsmall;
			
			//copy all objects for looking into the future
			asteroids2.list = Array.apply(Array,asteroids);
			ufoShots2.list = Array.apply(Array,ufoShots);
			
			ship2.posX = ship.pos;
			ship2.posY = ship.posY;
			ship2.rotation = ship.rotation;
			ship2.timeToWarp = ship.timeToWarp;
		    ship2.velocity = ship.velocity;
		           	
			
			bigUFO2.posX = bigUFO.posX;
			bigUFO2.posY = bigUFO.posY;
	        bigUFO2.velocity = bigUFO.velocity;
	        bigUFO2.seen = bigUFO.seen;
			bigUFO2.initialized = bigUFO.initialized;
	        
	        
			smallUFO2.posX = smallUFO.posX;
			smallUFO2.posY = smallUFO.posY;
		    smallUFO2.velocity = smallUFO.velocity;
		    smallUFO2.seen = smallUFO.seen;
		    smallUFO2.initialized = smallUFO.initialized;
			//check current course 3 seconds in future to see if there will be impact
		    if(tryPath(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2)){
		    	
		    }
		    
		    
			
			return 0;
		};
		
		function tryPath(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2){
			var i = 500;
		    for(i= 500;i<3000;i+=500){
		    	updateAll(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2,500);
				if(
				   collisions.checkCollisions(ship2,bigUFO2) ||
				   collisions.checkCollisions(ship2,asteroids2) ||
				   collisions.checkCollisions(ship2,ufoShots2) ||
				   collisions.checkCollisions(ship2,smallUFO2)
				   ){
					evasiveManeuvers(ship,asteroids,smallUFO,bigUFO,ufoShots,movement,elapsedTime);
				}
				else{

				}
		    }
		}
		
		function hunt(ship,asteroids,smallUFO,bigUFO,movement){
			
		}
		
		function evasiveManeuvers(ship,asteroids,smallUFO,bigUFO,ufoShots,movement){
			//use warp if we can
			if(ship.timeToWarp <= 0){
				movement.warp(ship,asteroids,smallUFO,bigUFO,ufoShots,collisions);
			}
			else{
				
			}
		}
		
		function updateAll(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2,time){
			ship2.update(500);
			if (smallUFO2.seen){
				smallUFO2.update(500,ship2);
			}
			if(bigUFO2.seen){
				bigUFO2.update(500,ship2);
			}
			for (var i = 0; i < asteroids2.list.length; i++)
	        { 
	            physics.drift(asteroids2.list[i],elapsedTime);
	            physics.wrapAround(asteroids2.list[i]);
	            physics.spin(asteroids2.list[i], elapsedTime);
	        }
			ufoShots2.update(500);
			ufoShots2.removeDead();
		}
		
		return that;
	}
	
	function UFOAI(type){
		var that = {
			shotTime : 0,
			changeTime : 0,
			aiType : type
		};
		
		that.nextVelocity = function(curVelocity, time){
			that.changeTime += time;
			if(that.changeTime >= aiChangeTime()){
				that.changeTime = 0;
				return aiNextVelocity();
			}
			else{
				return curVelocity;
			}
		};
		
		that.nextShot = function (time,ufo,ship,shotlist){
			var newShot;
			that.shotTime += time;
			if(that.shotTime >= aiShotTime()){
				that.shotTime = 0;
				// Shoot a shot!
				
				shotlist.list.push(aiShotVelocity(ufo,ship));
			}
			return;
			
		};
		
		function aiChangeTime(){
			if(that.aiType === 'small'){
				//every 5 seconds
				return 5000;
			}
			else{
				//every 10 seconds
				return 10000;
			}
		}
		function aiNextVelocity(){
			if(that.aiType === 'small'){
				velocity ={
						x : Random.nextGaussian(0,0.12),
						y : Random.nextGaussian(0,0.12)
				};
				return velocity;
			}
			else{
				velocity ={
						x : Random.nextGaussian(0,0.06),
						y : Random.nextGaussian(0,0.06)
				};
				return velocity;
			}
		}
		function aiShotTime(){
			if(that.aiType === 'small'){
				//every 3 second
				return 3000;
			}
			else{
				//every 5 seconds
				return 5000;
			}
		}
		
		function aiShotVelocity(ufo,ship){
			var newShip = futureShipLocation(ship,1000);
			var distAngle = physics.calcDistanceAndAngle(newShip,ufo);
			var velocity = {
					x : 0,
					y : 0
			};
			
			distAngle.rotation += aiShotAccuracy();
			
			var newShot = new Asteroids.objects.Shot(ufo);
			newShot.velocity.x = Math.cos(distAngle.rotation);
			newShot.velocity.y = Math.sin(distAngle.rotation);
			newShot.rotation = distAngle.rotation+Math.PI/2;
			
			return newShot;
			
			
		}
		
		function futureShipLocation(ship, futuretime){
			var newShip = new Asteroids.objects.Ship();
			newShip.posX = ship.posX;
			newShip.posY = ship.posY;
			newShip.velocity = ship.velocity;
			physics.drift(newShip,futuretime);
			return newShip;
		}
		
		function aiShotAccuracy(){
			if(that.aiType === 'small'){
				//we'll want to get this more accurate based on the score
				// 0 is 100% accurate ( based on prediction anyway)
				if(Asteroids.score < 40000){
					return (Random.nextDouble() - 0.5)/2;
				}
				else if (Asteroids.score < 60000){
					return (Random.nextDouble() -0.5)/4;
				}
				else{
					return 0;
				}
				
			}
			else{
				return Random.nextDouble() - 0.5;
			}
			
		}
		
		return that;
	}
	
	return {
		AI : AI,
		UFOAI : UFOAI
	};
	
	
}());