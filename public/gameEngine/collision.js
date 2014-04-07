Asteroids.collision = (function(){
	
	function CollisionDetection(){
		
		//public variables
		var that = {
			isCollision : false	
		};
		
		//private variables
		var borked = false;
		
		//public functions
		that.handleCollisions = function(objectgroup1, objectgroup2){
			//we convert the objects into array to make them easier to iterate over
			var obj1array = [],
				obj2array = [],
				i = 0,
				j = 0;
			
			if(objectgroup1.list){
				obj1array = objectgroup1.list;
			}
			else{
				obj1array.push(objectgroup1);
			}
			
			if(objectgroup2.list){
				obj2array = objectgroup2.list;
			}
			else{
				obj2array.push(objectgroup2);
			}
			
			for(i = 0; i< obj1array.length; i+=1){
				for(j = 0; j<obj2array.length; j+=1){
					if(isCollision(obj1array[i], obj2array[j])){
						if (obj1array[i].type === 'shot' && obj2array[j]!=='ship'){
							//add score
							Asteroids.asterScore.addScore(obj2array[j]);
						}
						goBoom(obj1array[i]);
						goBoom(obj2array[j]);
					}
				}
			}
			
		};
		//returns true if there is a a collision
		//used in AI and warp
		that.checkCollisions = function(objectgroup1, objectgroup2){
			//we convert the objects into array to make them easier to iterate over
			var obj1array = [],
				obj2array = [],
				i = 0,
				j = 0;
			
			if(objectgroup1.list){
				obj1array = objectgroup1.list;
			}
			else{
				obj1array.push(objectgroup1);
			}
			
			if(objectgroup2.list){
				obj2array = objectgroup2.list;
			}
			else{
				obj2array.push(objectgroup2);
			}
			
			for(i = 0; i< obj1array.length; i+=1){
				for(j = 0; j<obj2array.length; j+=1){
					if(isCollision(obj1array[i], obj2array[j])){
						return true;
					}
				}
			}
			return false;
		};
		
		//private functions
		function goBoom(obj){
			obj.die = true;
		}
		
		function isCollision(object1, object2){
			//just going to use circle collisions for now
			//This could be updated later if desired
			var object1Radius = Math.max(object1.width,object1.height)/2,
				object2Radius = Math.max(object2.width,object2.height)/2,
				distance = Math.sqrt( Math.pow(object1.posX - object2.posX,2) + Math.pow(object1.posY - object2.posY,2));
			if(distance < object1Radius + object2Radius){
				return true;
			}
			else{
				return false;
			}
		}
		
		return that;
	}
	
	return {
		CollisionDetection : CollisionDetection
	};
	
}());