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
                
                that.wrapAround = function(gameObject)
                {
                    if(gameObject.posX > 1)
                    {
                        gameObject.posX -= 1;
                    }
                    else if(gameObject.posX <  0)
                    {
                        gameObject.posX += 1;
                    }
                    
                    if(gameObject.posY >  1)
                    {
                        gameObject.posY -= 1;
                    }
                    else if(gameObject.posY <  0)
                    {
                        gameObject.posY += 1;
                    }
                    console.log("X,y : "+ gameObject.posX + ","+  gameObject.posY);
                    
                };
		
		return that;
	}
	
	
	return {
		ShipMovement : ShipMovement
	};
	
}());