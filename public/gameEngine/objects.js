Asteroids.objects = (function(){
	
	function Ship(){
		var that = {
				posX : 0,
				posY : 0,
                                
                                velocity : {
                                    x : 0,
                                    y : 0
                                },
                                
                                power: 0.1,
                                
				rotation : 0
		};
		
		return that;
		
	}
	
	function UFO(){
		var that = {
				posX : 0,
				posY : 0
		};
		
		return that;
	}
	
	function Asteroid(){
		var that = {
				posX : 0,
				posY : 0
		};
		
		return that;
	}
	
	return {
		Ship : Ship,
		UFO : UFO,
		Asteroid : Asteroid
	};
	
}());