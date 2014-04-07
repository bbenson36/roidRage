var physics = (function() {
	'use strict';
	
	function calcAngle(vector1, vector2){
		
		return 0;
	}
	
	function calcSpeed(time, acceleration,speed){
		return 0;
	}
	
	function calcDistanceAndAngle(gameObject1, gameObject2){
		var returnStuff = {
				distance : 0,
				rotation : 0
		},
		xdist = 0,
		ydist = 0;
		
		xdist = gameObject2.posX - gameObject1.posX;
		ydist = gameObject2.posY - gameObject1.posY;
		
		returnStuff.rotation = Math.atan2(ydist,xdist);
		returnStuff.distance = Math.sqrt(Math.pow(xdist,2) + Math.pow(ydist,2));
		
		return returnStuff;
	}
        
        function accelerate(gameObject, time)
        {
            var power = gameObject.power;
            var xVelocity = gameObject.velocity.x;
            var yVelocity = gameObject.velocity.y;
            var direction = gameObject.rotation;
            
            if(Math.abs(xVelocity) < 1)
            {
                xVelocity += (power * Math.cos(direction)) * (time/1000);
            }
            else
            {
                xVelocity = 0.99;
            }
            if(Math.abs(yVelocity) < 1)
            {
                yVelocity += (power * Math.sin(direction)) * (time/1000);
            }
            else
            {
                yVelocity = 0.99;
            }
            
            
            gameObject.velocity.x = xVelocity;
            gameObject.velocity.y = yVelocity;
        }
	
        function drift(gameObject, time)
        {
            gameObject.posX -= gameObject.velocity.x*Asteroids.size.height * (time/1000);
            gameObject.posY -= gameObject.velocity.y*Asteroids.size.width *time/1000;
        }
        
        function wrapAround(gameObject)
        {
            if(gameObject.posX > Asteroids.size.width)
            {
                gameObject.posX -= Asteroids.size.width;
            }
            else if(gameObject.posX < 0)
            {
                gameObject.posX += Asteroids.size.width;
            }

            if(gameObject.posY > Asteroids.size.height)
            {
                gameObject.posY -= Asteroids.size.height;
            }
            else if(gameObject.posY < 0)
            {
                gameObject.posY += Asteroids.size.height;
            }
        }
        
        function spin(gameObject, time)
        {
            gameObject.rotation += gameObject.spin * time;
        }
	
	return {
		caclAngle : calcAngle,
		calcSpeed : calcSpeed,
		calcDistanceAndAngle : calcDistanceAndAngle,
                accelerate : accelerate,
                drift : drift,
                wrapAround : wrapAround,
                spin : spin
	};
}());