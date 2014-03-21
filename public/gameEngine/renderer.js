/*jslint browser: true, white: true */
/*global CanvasRenderingContext2D, requestAnimationFrame, console, Asteroids */
// ------------------------------------------------------------------
// 
// This is the game object.  Everything about the game is located in 
// this object.
//
// ------------------------------------------------------------------

Asteroids.graphics = (function() {
	'use strict';
	
	var canvas = document.getElementById('canvas-main'),
		context = canvas.getContext('2d');
	
	//------------------------------------------------------------------
	//
	// Place a 'clear' function on the Canvas prototype, this makes it a part
	// of the canvas, rather than making a function that calls and does it.
	//
	//------------------------------------------------------------------
	CanvasRenderingContext2D.prototype.clear = function() {
		this.save();
		this.setTransform(1, 0, 0, 1, 0, 0);
		this.clearRect(0, 0, canvas.width, canvas.height);
		this.restore();
	};
	
	//------------------------------------------------------------------
	//
	// Public function that allows the client code to clear the canvas.
	//
	//------------------------------------------------------------------
	function clear() {
		context.clear();
	}
	
	function timeDraw(myTime, timeSpec){
		var that = {time : myTime};
		
		timeSpec.pos = {};
		
		
		return that;
	}
	
	function drawImage(spec) {
		context.save();
		
		context.translate(spec.center.x, spec.center.y);
		context.rotate(spec.rotation);
		context.translate(-spec.center.x, -spec.center.y);
		
		context.drawImage(
			spec.image, 
			spec.center.x - spec.size/2, 
			spec.center.y - spec.size/2,
			spec.size, spec.size);
		
		context.restore();
	}
	
	function CountDraw(spec){
		var that={};
		
		that.draw = function(score){
			var posX = canvas.width*0.5,
			posY = canvas.height*0.50;
			context.font = spec.font;
			context.fillStyle = spec.fill;
			context.strokeStyle = spec.stroke;
			context.textBaseline = 'top';
			context.fillText(score, posX, posY);
			context.strokeText(score, posX, posY);
		};
		
		return that;
	}
	
	function ScoreDraw(spec){
		var that = {};
		
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;
		
		
		that.draw = function(score){
			var posX = canvas.width*0.05+canvas.width*0.80,
			posY = canvas.height*0.20;
			context.font = spec.font;
			context.fillStyle = spec.fill;
			context.strokeStyle = spec.stroke;
			context.textBaseline = 'top';
			context.fillText(zeroFill(score,5), posX, posY);
			context.strokeText(zeroFill(score,5), posX, posY);
		};
		
		
		//http://stackoverflow.com/questions/1267283/how-can-i-create-a-zerofilled-value-using-javascript
		function zeroFill( number1, width1 )
		{
		  width1 -= number1.toString().length;
		  if ( width1 > 0 )
		  {
		    return new Array( width1 + (/\./.test( number1 ) ? 2 : 1) ).join( '0' ) + number1;
		  }
		  return number1 + ""; // always return a string
		}

		
		return that;
	}
	
	function highScore(player){
		var that = {highScores: player.highScores};
		
		that.draw = function(){
			var node = document.getElementById("output");
			node.innerHTML = "";
			if(typeof that.highScores != 'undefined'){
				
				for(var index =0; index < that.highScores.length; ++index){
					node = document.getElementById("output");
					node.innerHTML += (index+1) +". \n" +"Score: "+that.highScores[index].score+" Time: "+that.highScores[index].time;
					node.scrollTop = node.scrollHeight;
				}
			}
		};
		
		function printScore(highscore){
			return "Score: "+highScore.score+" Time: "+highScore.time;
		}
		
		return that;
	}
	
	function PigDraw(spec){
		var that = {widthHeight : 0};
		
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;
		
		that.draw = function(){
			context.drawImage(
					spec.pigIm,
					canvas.width*0.05+canvas.width*0.80,
					canvas.height*0.05,
					canvas.width*.15,canvas.height*.15
					);
		};
		
		return that;
	}
	
	function CoinDraw(spec){
		var that = {};
		canvas.width  = window.innerWidth;
		canvas.height = window.innerHeight;
		
		that.draw = function(coins){
			for(var i = 0;i<coins.usCoins.length;++i){
				context.drawImage(
						spec.usIm,
						coins.usCoins[i].posX*(canvas.width*.8),
						coins.usCoins[i].posY*canvas.height,
						canvas.width*spec.usSize, canvas.height*spec.usSize
						);
			}
			for(var i = 0;i<coins.romanCoins.length;++i){
				context.drawImage(
						spec.roIm,
						coins.romanCoins[i].posX*(canvas.width*.8),
						coins.romanCoins[i].posY*canvas.height,
						canvas.width*spec.roSize, canvas.height*spec.roSize
						);
			}
			for(var i = 0;i<coins.canadianCoins.length;++i){
				context.drawImage(
						spec.caIm,
						coins.canadianCoins[i].posX*(canvas.width*.8),
						coins.canadianCoins[i].posY*canvas.height,
						canvas.width*spec.caSize, canvas.height*spec.caSize
						);
			}
			context.drawImage(
					spec.clIm,
					coins.clock.posX*(canvas.width*.8),
					coins.clock.posY*canvas.height,
					canvas.width*spec.clSize, canvas.height*spec.clSize
					);
			
			
		};
		
		return that;
	}
	
	function ShipDraw(spec){
		var that = {};
		
		that.draw = function(ship){
			
			context.save();
			
			context.translate(ship.posX*canvas.width, ship.posY*canvas.height);
			context.rotate(ship.rotation);
			context.translate(-ship.posX*canvas.width, -ship.posY*canvas.height);
			
			context.drawImage(
					spec.image, 
					ship.posX*canvas.width,
					ship.posY*canvas.height,
					spec.width, 
					spec.height
					);
			context.restore();
		};
		
		return that;
		
	}
	
	function BackgroundDraw(spec){
		var that = {};
		
		that.draw = function(){
			canvas.width  = window.innerWidth;
			canvas.height = window.innerHeight;
			
			context.drawImage(
					spec.image, 
					0, 
					0,
					canvas.width, 
					canvas.height
					);
			
		};
		
		return that;
		
	}

	return {
		clear : clear,
		BackgroundDraw : BackgroundDraw,
		drawImage : drawImage,
		ShipDraw : ShipDraw
	};
}());
