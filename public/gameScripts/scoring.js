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
	
	function AsteroidScore(){
		var that = {};
		
		that.addScore = function(destroyedObject){
			if (destroyedObject.type === 'roid'){
				if(destroyedObject.generation === 1){
					Asteroids.score += 100;
				}
				else if(destroyedObject.generation === 2){
					Asteroids.score += 200;
				}
				else{
					Asteroids.score += 300;
				}
			}
			else if(destroyedObject.type === 'smallUFO'){
				Asteroids.score += 3000;
			}
			else if (destroyedObject.type === 'bigUFO'){
				Asteroids.score += 1000;
			}
			
		};
		
		that.resetScore = function(){
			Asteroids.score = 0;
		};
		
		return that;
		
	}

	function sendScoreServer(){
		var name = $('#id-playerName').val(),
		score = Asteroids.score;
		$.ajax({
			url: 'http://localhost:3000/v1/high-scores?name=' + name + '&score=' + score,
			type: 'POST',
			error: function() { alert('POST failed'); },
			success: function() {
				that.getScoresServer();
			}
		});
	}
	
	function getScoresServer(){
		$.ajax({
			url: 'http://localhost:3000/v1/high-scores',
			cache: false,
			type: 'GET',
			error: function() { alert('GET failed'); },
			success: function(data) {
				var list = $('#result-high-scores'),
				value;
				list.empty();
				for (value = 0; value < data.length; value++) {
					var text = (data[value].name + ' : ' + data[value].score);
					list.append($('<li>', { text: text }));
				}
			}
		});
	}
		
	return {
		sendScoreServer: sendScoreServer,
		getScoresServer: getScoresServer,
		GenericScoring : GenericScoring,
		AsteroidScore : AsteroidScore
	};
	
}());