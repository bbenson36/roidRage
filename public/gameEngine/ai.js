Asteroids.ai = (function(){
	
	function AI (){
		var that = {
				test : 0
		};
		
		that.nextMove = function(){
			return 0;
		};
		
		return that;
	}
	
	function UFOAI(type){
		var that = {
			shotTime : 0,
			changeTime : 0,
			aiType : type
		};
		
		that.nextVelocity = function(curVelocity, time){
			that.changeTime += time;
			if(that.changeTime >= aiChangeTime()){
				that.changeTime = 0;
				return aiNextVelocity();
			}
			else{
				return curVelocity;
			}
		};
		
		that.nextShot = function (ufo, ship, time){
			that.shotTime += time;
			if(that.shotTime >= aiShotTime()){
				that.shotTime = 0;
				// Shoot a shot!
				// aiNextShotAccuracy();
			}
			
		};
		
		function aiChangeTime(){
			if(that.aiType = 'small'){
				//every second
				return 5000;
			}
			else{
				//every 3 seconds
				return 10000;
			}
		}
		function aiNextVelocity(){
			if(that.aiType = 'small'){
				velocity ={
						x : Random.nextGaussian(0,0.12),
						y : Random.nextGaussian(0,0.12)
				};
				return velocity;
			}
			else{
				velocity ={
						x : Random.nextGaussian(0,0.06),
						y : Random.nextGaussian(0,0.06)
				};
				return velocity;
			}
		}
		function aiShotTime(){
			if(that.aiType = 'small'){
				//every second
				return 1000;
			}
			else{
				//every 3 seconds
				return 3000;
			}
		}
		function aiShotAccuracy(){
			if(that.aiType = 'small'){
				//we'll want to get this more accurate based on the score
				
				return ;
			}
			else{
				//every 3 seconds
				return 3000;
			}
			
		}
		
		return that;
	}
	
	return {
		AI : AI,
		UFOAI : UFOAI
	};
	
	
}());