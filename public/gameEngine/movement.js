Asteroids.movement = (function(){
	
	function ShipMovement() {
		var that = {
			turnRate : 1	
		};
		
		that.turnLeft = function(ship, elapsedTime){
			ship.rotation -= that.turnRate*elapsedTime/1000;
			console.log("left!");
		};
		
		that.turnRight = function(ship, elapsedTime){
			ship.rotation += that.turnRate*elapsedTime/1000;
			console.log("right!");
		};
		
		//this will need to make a physics call
		that.booster = function(gamebject,elapsedTime){
                    
                        physics.accelerate(gamebject, elapsedTime);
			console.log("boost!");
		};
		
		return that;
	}
	
	
	return {
		ShipMovement : ShipMovement
	};
	
}());