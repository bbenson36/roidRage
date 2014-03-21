var physics = (function() {
	'use strict';
	
	function calcAngle(vector1, vector2){
		
		return 0;
	}
	
	function calcSpeed(time, acceleration,speed){
		return 0;
	}
        
        function accelerate(gameObject, time)
        {
            var power = gameObject.power;
            var xVelocity = gameObject.velX;
            var yVelocity = gameObject.velY;
            var direction = gameObject.rotation;
            
            if(xVelocity < 0.1)
            {
                xVelocity += (power * Math.cos(direction)) * (time/1000);
            }
            if(yVelocity < 0.1)
            {
                yVelocity += (power * Math.sin(direction)) * (time/1000);
            }
            
            
            gameObject.velX = xVelocity;
            gameObject.velY = yVelocity;
        }
	
	
	return {
		caclAngle : calcAngle,
		calcSpeed : calcSpeed,
                accelerate : accelerate
	};
}());