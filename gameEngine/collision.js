Asteroids.collision = (function(){
	
	function CollisionDetection(){
		
		//public variables
		var that = {
			isCollision : false	
		};
		
		//private variables
		var borked = false;
		
		//public functions
		that.handleCollisions = function(objects){
			if (!borked){
				return objects;
			}
		};
		
		//private functions
		function removeDestroyedObjects(){
			
		}
		function addNewObjects(){
			
		}
		
		return that;
	}
	
	return {
		CollisionDetection : CollisionDetection
	};
	
}());