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
            var xVelocity = gameObject.velocity.x;
            var yVelocity = gameObject.velocity.y;
            var direction = gameObject.rotation;
            
            if(xVelocity < 1)
            {
                xVelocity += (power * Math.cos(direction)) * (time/1000);
            }
            if(yVelocity < 1)
            {
                yVelocity += (power * Math.sin(direction)) * (time/1000);
            }
            
            
            gameObject.velocity.x = xVelocity;
            gameObject.velocity.y = yVelocity;
        }
	
        function drift(gameObject, time)
        {
            gameObject.posX -= gameObject.velocity.x * (time/1000);
            gameObject.posY -= gameObject.velocity.y *time/1000;
        }
        
        function wrapAround(gameObject)
        {
            if(gameObject.xPos > 1)
            {
                gameObject.xPos -= 1;
            }
            else if(gameObject.xPos <  0)
            {
                gameObject.xPos += 1;
            }

            if(gameObject.yPos >  1)
            {
                gameObject.yPos -= 1;
            }
            else if(gameObject.yPos <  0)
            {
                gameObject.yPos += 1;
            }
            console.log("x,y : "+ gameObject.xPos + ","+  gameObject.yPos);
        }
	
	return {
		caclAngle : calcAngle,
		calcSpeed : calcSpeed,
                accelerate : accelerate,
                drift : drift,
                wrapAround : wrapAround
	};
}());