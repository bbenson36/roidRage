Asteroids.movement = (function(){
	
	function ShipMovement() {
		var that = {
			turnRate : 3	
		};
		
		that.warp = function(ship,asteroids,smallUFO,bigUFO,ufoShots,collisions){
			if (ship.timeToWarp <=0){
				//warp!
				var safePlaceFound = false;
				
				//make a new ship we are going to try random positions with
				var newShip = new Asteroids.objects.Ship();
				

				
				while(!safePlaceFound){
					newShip.posX = Math.floor(Random.nextDouble() * Asteroids.size.width);
					newShip.posY = Math.floor(Random.nextDouble() * Asteroids.size.height);
					
					//check for collisions:
					if(
					collisions.checkCollisions(newShip,bigUFO) ||
					collisions.checkCollisions(newShip, asteroids) ||
			        collisions.checkCollisions(newShip,ufoShots) ||
			        collisions.checkCollisions(newShip,smallUFO)
			        ){
						//not Safe!
						//idempotent really
						//done for clarity
						safePlaceFound = false;
					}
					else{
						safePlaceFound = true;
					}

				}
				ship.posX = newShip.posX;
				ship.posY = newShip.posY;
				
				ship.velocity = {x: 0, y:0};
				//every 5 seconds you can warp
				ship.timeToWarp = 5000;
			}
		}
		
		that.turnLeft = function(ship, elapsedTime){
			ship.rotation -= that.turnRate*elapsedTime/1000;
			//console.log("left!");
		};
		
		that.turnRight = function(ship, elapsedTime){
			ship.rotation += that.turnRate*elapsedTime/1000;
			//console.log("right!");
		};
		
		//this will need to make a physics call
		that.booster = function(gameobject,elapsedTime){
			physics.accelerate(gameobject, elapsedTime);
            gameobject.isBoosting = true;
			//console.log("boost!");
		};
		
		return that;
	}
	
	
	return {
		ShipMovement : ShipMovement
	};
	
}());