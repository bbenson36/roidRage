Asteroids.objects = (function(){
	
    function Ship(){
        var that = {
            posX : 0.5,
            posY : 0.5,
            
            height : 30,
            width : 30,

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
            generation : size,
            scale : 1/size,
            
            height : 50,
            width : 50,

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
        
    function AsteroidList(){
        var that = {
            list : []
        };
        
        return that;
    }
    
    function ShotList(){
        var that = {
            list : []
        };
        
        return that;
    }
    
    function UFOList(){
        var that = {
            list : []
        };
        
        return that;
    }
        
        
    function Shot(ship){

        var that = {
            posX : ship.posX,
            posY : ship.posY,
            
            height : 50,
            width : 50,

            velocity : {
                x : Math.cos(ship.rotation),
                y : Math.sin(ship.rotation)
            },
            
            rotation : ship.rotation+(Math.PI/2),
            
            age : 0,
            
            type : "shot"
        };
        
        return that;
    }
	
	return {
		Ship : Ship,
		UFO : UFO,
		Asteroid : Asteroid,
                Shot : Shot,
                AsteroidList : AsteroidList,
                ShotList : ShotList,
                UFOList : UFOList
	};
	
}());