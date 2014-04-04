Asteroids.objects = (function(){
	
    function Ship(){
        var that = {
            posX : 0,
            posY : 0,
            
            height : 30,
            width : 30,
            isBoosting : false,
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
            posX : Math.random() * Asteroids.size.width,
            posY : Math.random() * Asteroids.size.height,
            generation : size,
            scale : 1/size,
            
            height : 50,
            width : 50,

            velocity : {
                x : Random.nextGaussian(0,0.06),
                y : Random.nextGaussian(0,0.06)
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
        
        
        that.handleHits = function(){
        	var i, j, newAsteroid;
        	for(i = 0; i<that.list.length; i+=1){
	        	aster = that.list[i];
        		if(aster.die){
	        		if(aster.generation === 1){
                        for(j = 0; j<3; j+=1){
                        	newAsteroid = new Asteroid(aster.generation+1);
                        	newAsteroid.posX = aster.posX;
                        	newAsteroid.posY = aster.posY;
                            that.list.push(newAsteroid);   
                        }
                        that.list.splice(i, 1);
                    }
                    else if(aster.generation === 2){
                        for(j = 0; j<4; j+=1){
                        	newAsteroid = new Asteroid(aster.generation+1);
                        	newAsteroid.posX = aster.posX;
                        	newAsteroid.posY = aster.posY;
                            that.list.push(newAsteroid); 
                        }
                        that.list.splice(i, 1);
                    }
                    else{
                        that.list.splice(i, 1);
                    }
	        	}
        	}
        };
        
        return that;
    }
    
    function ShotList(){
        var that = {
            list : []
        };
        
        that.removeDead = function(){
        	var i;
        	for(i = 0; i<that.list.length; i+=1){
	        	if(that.list[i].age > 2500){
	                that.list.shift();
	            }
	        	else if(that.list[i].die){
	        		that.list.splice(i,1);
	        	}
        	}
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