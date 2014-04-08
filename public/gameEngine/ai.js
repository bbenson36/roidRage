Asteroids.ai = (function(){
	
	function AI (ship,asteroids,bigUFO,smallUFO,shotList,ufoShots,collisions,movement){
		var that = {
				test : 0
		};
		
		that.initMove = function (){
			movement.turnLeft(ship,Asteroids.elapsedTime);
			movement.booster(ship,Asteroids.elapsedTime);
		};
		
		that.nextMove = function(){
			var ship2 = new Asteroids.objects.Ship(),
			asteroids2 = new Asteroids.objects.AsteroidList(),
			ufoShots2 = new Asteroids.objects.ShotList(),
			bigUFO2 = new Asteroids.objects.UFOBig(ufoShots2),
			smallUFO2 = new Asteroids.objects.UFOSmall(ufoShots2);
			
			resetObjects(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
			//check current course 2 seconds in future to see if there will be impact
		    if(tryPath(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2) < 2000){
		    	//there will be an impact. Try some actions to find a path
		    	//that will keep it safe
		    	evasiveManeuvers(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
		    }
		    else{
		    	//try some actions to see if you can kill something
		    	var success = hunt(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
		    	if(!success){
		    		doRandom();
		    	}
		    }
			return 0;
		};
		
		function deepCopyAster(list){
			var i;
			var newList = [];
			for (i=0; i< list.length; i+=1){
				var roid = new Asteroids.objects.Asteroid();
				roid.posX = list[i].posX;
				roid.posY = list[i].posY;
	            roid.generation = list[i].generation;
	            roid.scale = list[i].scale;
	            
	            roid.height = list[i].height;
	            roid.width = list[i].width;

	            roid.velocity.x = list[i].velocity.x;
	            roid.velocity.y = list[i].velocity.y;
	            roid.rotation = list[i].rotation;
	            roid.spin = list[i].spin;
	            newList.push(roid);
			}
			return newList;
		}
		
		function deepCopyShots(list){
			var i,
				newList = [];
			for (i=0; i< list.length; i+=1){
				var shot = new Asteroids.objects.Shot(smallUFO);
				shot.posX = list[i].posX;
				shot.posY = list[i].posY;
	            shot.height = list[i].height;
	            shot.width = list[i].width;

	            shot.velocity.x = list[i].velocity.x;
	            shot.velocity.y = list[i].velocity.y;
	            shot.rotation = list[i].rotation;
	            shot.age = list[i].age;
	            newList.push(shot);
			}
			return newList;
		}
		
		
		function resetObjects(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2){
			//copy all objects for looking into the future
			asteroids2.list = deepCopyAster(asteroids.list);
			if(typeof ufoShots2!=='undefined'){
				ufoShots2.list = deepCopyShots(ufoShots.list);
			}
			
			ship2.posX = ship.posX;
			ship2.posY = ship.posY;
			ship2.rotation = ship.rotation;
			ship2.timeToWarp = ship.timeToWarp;
		    ship2.velocity.x = ship.velocity.x;
		    ship2.velocity.y = ship.velocity.y;
		           	
			bigUFO2.velocity = {};
			bigUFO2.posX = bigUFO.posX;
			bigUFO2.posY = bigUFO.posY;
	        bigUFO2.velocity.x = bigUFO.velocity.x;
	        bigUFO2.velocity.y = bigUFO.velocity.y;
	        bigUFO2.seen = bigUFO.seen;
			bigUFO2.initialized = bigUFO.initialized;
	        
			smallUFO2.velocity = {};
			smallUFO2.posX = smallUFO.posX;
			smallUFO2.posY = smallUFO.posY;
			smallUFO2.velocity.x = smallUFO.velocity.x;
	        smallUFO2.velocity.y = smallUFO.velocity.y;
		    smallUFO2.seen = smallUFO.seen;
		    smallUFO2.initialized = smallUFO.initialized;
		}
		
		function tryPath(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2){
			var i;
		    for(i= 100;i<2000;i+=100){
		    	updateAll(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2,100);
				if(
				   collisions.checkCollisions(ship2,bigUFO2) ||
				   collisions.checkCollisions(ship2,asteroids2) ||
				   collisions.checkCollisions(ship2,ufoShots2) ||
				   collisions.checkCollisions(ship2,smallUFO2)
				   ){
					return i;
				}
		    }
		    return 2000;
		}
		
		function doRandom(){
			if(Random.nextDouble() > 0.7){
				movement.turnLeft(ship,Asteroids.elapsedTime);
			}
			else{
				movement.turnRight(ship,Asteroids.elapsedTime);
			}
			if(Random.nextDouble() > 0.8){
				movement.booster(ship,Asteroids.elapsedTime);
			}
			
		}
		
		function hunt(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2){
			//try a couple of actions to see if
			//something can be hit with a shot
			
			var shotList2 = new Asteroids.objects.ShotList();
			resetObjects(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
			
			shotList2.requestShot(ship);
			if(willKill(ship2,shotList2,asteroids2,smallUFO2,bigUFO2)){
				//actual ACTION!
				shotList.requestShot(ship);
				return true;
			}
			else{
				resetObjects(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
				movement.turnRight(ship2,Asteroids.elapsedTime);
				shotList2.requestShot(ship);
				//turn right and shoot
				if (willKill(ship2,shotList2,asteroids2,smallUFO2,bigUFO2)){
					movement.turnRight(ship,Asteroids.elapsedTime);
					shotList.requestShot(ship);
					return true;
				}
				else{
					resetObjects(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
					movement.turnLeft(ship2,Asteroids.elapsedTime);
					shotList2.requestShot(ship);
					//turn left and shoot
					if(willKill(ship2,shotList2,asteroids2,smallUFO2,bigUFO2)){
						movement.turnLeft(ship,Asteroids.elapsedTime);
						shotList.requestShot(ship);
						return true;
					}
				}
			}
			return false;
			
		}
		
		function willKill(ship2,shotList2,asteroids2,smallUFO2,bigUFO2){
			var i;
			//check AI Shots for collisions with asteroids or UFO
			for(i= 100;i<1000;i+=100){
		    	updateAll(ship2,asteroids2,smallUFO2,bigUFO2,shotList2,100);
				if(
				   collisions.checkCollisions(shotList2,bigUFO2) ||
				   collisions.checkCollisions(shotList2,asteroids2) ||
				   collisions.checkCollisions(shotList2,smallUFO2)
				   ){
					return true;
				}
		    }
			return false;
		}
		
		function evasiveManeuvers(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2){
			//maximize survival time by choosing the actions that lead to largest
			//trypath value
			var curBestSurvival = 100,
				bestMove = -1,
				curMove = 0,
				temp = 0;
			
			//boost
			resetObjects(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
			movement.booster(ship2,Asteroids.elapsedTime);
			temp = tryPath(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
			if(temp>curBestSurvival){
				curBestSurvival = temp;
				bestMove =curMove;
			}
			
			curMove = 1;
			//turn left and boost
			resetObjects(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
			movement.turnLeft(ship2,Asteroids.elapsedTime);
			movement.booster(ship2,Asteroids.elsapedTime);
			temp = tryPath(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
			if(temp>curBestSurvival){
				curBestSurvival = temp;
				bestMove =curMove;
			}
			
			curMove = 2;
			//turn right and boost
			resetObjects(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
			movement.turnRight(ship2,Asteroids.elapsedTime);
			movement.booster(ship2,Asteroids.elapsedTime);
			temp = tryPath(ship2,asteroids2,smallUFO2,bigUFO2,ufoShots2);
			if(temp>curBestSurvival){
				curBestSurvival = temp;
				bestMove =curMove;
			}
			if(curBestSurvival < 300 && ship.timeToWarp <= 0){
				//use warp if we can
				movement.warp(ship,asteroids,smallUFO,bigUFO,ufoShots,collisions);
			}
			else{
				if(bestMove ===0){
					movement.booster(ship,Asteroids.elapsedTime);
				}
				else if (bestMove ===1){
					movement.turnLeft(ship,Asteroids.elapsedTime);
					movement.booster(ship,Asteroids.elapsedTime);
				}
				else if (bestMove === 2){
					movement.turnRight(ship,Asteroids.elapsedTime);
					movement.booster(ship,Asteroids.elapsedTime);
				}
				else{
					//we're dead!
					//shoot, boost and turn
					//movement.warp(ship,asteroids,smallUFO,bigUFO,ufoShots,collisions);
					shotList.requestShot(ship);
					movement.turnRight(ship,Asteroids.elapsedTime);
					movement.booster(ship,Asteroids.elapsedTime);
				}
			}
			
		}
		
		function updateAll(ship2,asteroids2,smallUFO2,bigUFO2,shots2,time){
			ship2.update(time);
			if (smallUFO2.seen){
				smallUFO2.update(time,ship2);
			}
			if(bigUFO2.seen){
				bigUFO2.update(time,ship2);
			}
			for (var i = 0; i < asteroids2.list.length; i++)
	        { 
	            physics.drift(asteroids2.list[i],time);
	            physics.wrapAround(asteroids2.list[i]);
	            physics.spin(asteroids2.list[i], time);
	        }
			shots2.update(time);
			shots2.removeDead();
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