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
		
		that.nextShot = function (time,ufo,ship,shotlist){
			var newShot;
			that.shotTime += time;
			if(that.shotTime >= aiShotTime()){
				that.shotTime = 0;
				// Shoot a shot!
				
				shotlist.list.push(aiShotVelocity(ufo,ship));
			}
			return;
			
		};
		
		function aiChangeTime(){
			if(that.aiType === 'small'){
				//every 5 seconds
				return 5000;
			}
			else{
				//every 10 seconds
				return 10000;
			}
		}
		function aiNextVelocity(){
			if(that.aiType === 'small'){
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
			if(that.aiType === 'small'){
				//every 5 second
				return 5000;
			}
			else{
				//every 10 seconds
				return 10000;
			}
		}
		
		function aiShotVelocity(ufo,ship){
			var newShip = futureShipLocation(ship,1000);
			var distAngle = physics.calcDistanceAndAngle(newShip,ufo);
			var velocity = {
					x : 0,
					y : 0
			};
			
			distAngle.rotation += aiShotAccuracy();
			
			var newShot = new Asteroids.objects.Shot(ufo);
			newShot.velocity.x = Math.cos(distAngle.rotation);
			newShot.velocity.y = Math.sin(distAngle.rotation);
			newShot.rotation = distAngle.rotation+Math.PI/2;
			
			return newShot;
			
			
		}
		
		function futureShipLocation(ship, futuretime){
			var newShip = new Asteroids.objects.Ship();
			newShip.posX = ship.posX;
			newShip.posY = ship.posY;
			newShip.velocity = ship.velocity;
			physics.drift(newShip,futuretime);
			return newShip;
		}
		
		function aiShotAccuracy(){
			if(that.aiType === 'small'){
				//we'll want to get this more accurate based on the score
				// 0 is 100% accurate
				return 0;
			}
			else{
				return 0;
			}
			
		}
		
		return that;
	}
	
	return {
		AI : AI,
		UFOAI : UFOAI
	};
	
	
}());