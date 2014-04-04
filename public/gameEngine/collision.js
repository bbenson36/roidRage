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
						goBoom(obj1array[i]);
						goBoom(obj2array[j]);
					}
				}
			}
			
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
				/*object1X = object1.posX*Math.cos(object1.rotation) + object1.width/2,
				object1Y = object1.posY*Math.sin(object1.rotation) + object1.height/2,
				object2X = object2.posX*Math.cos(object2.rotation) + object2.width/2,
				object2Y = object2.posY*Math.sin(object2.rotation) + object2.height/2,
				distance = Math.sqrt( Math.pow(object1X - object2X,2) + Math.pow(object1Y - object2Y,2));
				*/
				distance = Math.sqrt( Math.pow(object1.posX - object2.posX,2) + Math.pow(object1.posY - object2.posY,2));
			if(distance < object1Radius + object2Radius){
				console.log("hit!");
				console.log(object1.type + " " + object2.type);
				console.log("dist: " + distance);
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