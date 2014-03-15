Asteroids.screens['main-menu'] = (function() {
	'use strict';
	
	function initialize() {
		//
		// Setup each of menu events for the screens
		document.getElementById('id-new-game').addEventListener(
			'click',
			function() { Asteroids.game.showScreen('game-play'); },
			false);
		
		document.getElementById('id-high-scores').addEventListener(
			'click',
			function() { Asteroids.game.showScreen('high-scores'); },
			false);
		
		document.getElementById('id-help').addEventListener(
			'click',
			function() { Asteroids.game.showScreen('help'); },
			false);
		
		document.getElementById('id-about').addEventListener(
			'click',
			function() { Asteroids.game.showScreen('about'); },
			false);
	}
	
	function run() {
		//
		// I know this is empty, there isn't anything to do.
	}
	
	return {
		initialize : initialize,
		run : run
	};
}());
