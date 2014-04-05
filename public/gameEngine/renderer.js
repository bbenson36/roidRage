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
	
	function ShipDraw(spec){
		var that = {};
		
		that.draw = function(ship){
			
			context.save();
			
			context.translate(ship.posX, ship.posY);
			context.rotate(ship.rotation);
			context.translate(-ship.posX, -ship.posY);
			
			context.drawImage(
					spec.image, 
					ship.posX - (ship.width/2),
					ship.posY - (ship.height/2),
					ship.width, 
					ship.height
					);
			
			
			context.restore();
		};
		
		return that;
		
	}
        
        function ShotDraw(spec){
		var that = {};
		
		that.draw = function(shot){
			
			context.save();
			
			context.translate(shot.posX, shot.posY);
			context.rotate(shot.rotation);
			context.translate(-shot.posX, -shot.posY);
			
			context.drawImage(
					spec.image, 
					shot.posX - (shot.width/2),
					shot.posY - (shot.height/2),
					shot.width,
                    shot.height
					);
			context.restore();
		};
		
		return that;
		
	}
        
        
        function RoidDraw(spec){
            var that = {};

            that.draw = function(roid){

                context.save();

                context.translate(roid.posX, roid.posY);
                context.rotate(roid.rotation);
                context.translate(-roid.posX, -roid.posY);

                context.drawImage(
                    spec.image, 
                    roid.posX - (roid.width/2),
                    roid.posY - (roid.height/2),
                    roid.width, 
                    roid.height
                    );
                context.restore();
            };

            return that;
	}
	
	function BackgroundDraw(spec){
		var that = {};
		
		that.draw = function(){
			canvas.width  = Asteroids.size.width;//window.innerWidth;
			canvas.height = Asteroids.size.height;//window.innerHeight;
			
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
		ShipDraw : ShipDraw,
        RoidDraw : RoidDraw,
        drawImage: drawImage,
        ShotDraw : ShotDraw
	};
}());
