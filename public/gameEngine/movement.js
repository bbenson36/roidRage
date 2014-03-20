Asteriods.movement = (function(){
	
	function ShipMovement() {
		var that = {
			turnRate : 1	
		};
		
		that.turnLeft = function(ship, elapsedTime){
			ship.heading += turnRate*elapsedTime;
		};
		
		that.turnRight = function(ship, elapsedTime){
			ship.heading += turnRate*elapsedTime;
		};
		
		that.booster = function(ship,elapsedTime){
			ship.pos += ship.heading * elapsedTime/1000;
		};
		
		return that;
	}
	
	
	return {
		ShipMovement : ShipMovement
	};
	
}());