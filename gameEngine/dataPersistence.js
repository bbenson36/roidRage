Asteroids.dataPersistence = (function(){
	
	
	function SaveHandler(){
		var that = {
			saved : false
		};
		
		that.saveGame = function(name){
			
		};
		
		that.loadGame = function(name){
			
		};
		
		that.listSavedGames = function(){
			var list = 0;
			return list;
		};
		
		return that;
		
	}
	
	return {
		SaveHandler : SaveHandler
	};
	
}());