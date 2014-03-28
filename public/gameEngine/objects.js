Asteroids.objects = (function(){
	
    function Ship(){
        var that = {
            posX : 0.5,
            posY : 0.5,

            velocity : {
                x : 0,
                y : 0
            },

            power: 0.1,

            rotation : 0,
            
            type : "ship"
        };
	return that;
	}
	
	function UFO(){
            var that = {
                posX : 0,
                posY : 0,
                type : "ship"
            };
		
        return that;
	}
	
    function Asteroid(size){
        var that = {
            posX : Math.random(),
            posY : Math.random(),
            scale : 1/size,

            velocity : {
                x : Random.nextGaussian(0,0.05),
                y : Random.nextGaussian(0,0.05)
            },
            rotation : Math.random(),
            spin : (Math.random()-0.5)/100,
            
            
            type : "roid"
        };
        
        return that;
	}
        
        
    function Shot(ship){
                var that = {
            posX : ship.posX,
            posY : ship.posY,

            velocity : {
                x : Math.cos(ship.rotation),
                y : Math.sin(ship.rotation)
            },
            
            rotation : ship.rotation,
            
            age : 0,
            
            type : "shot"
        };
        
        return that;
    }
	
	return {
		Ship : Ship,
		UFO : UFO,
		Asteroid : Asteroid,
                Shot : Shot
	};
	
}());