Asteroids.scoring = (function(){
	function GenericScoring(){
		var that = {
				score : 0
		};
		
		that.addScore = function (points){
			score += points;
		};
		
		that.subtractScore = function(points){
			score -=points;
		};
		
		that.getScore = function (){
			return score;
		};
		
		return that;
	}
	
	return {
		GenericScoring : GenericScoring
	};
	
}());