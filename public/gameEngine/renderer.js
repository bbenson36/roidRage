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
	
	
	function ShipDraw(spec){
		var that = {};
		
		that.draw = function(ship){
			
			context.save();
			
			context.translate(ship.posX*canvas.width, ship.posY*canvas.height);
			context.rotate(ship.rotation);
			context.translate(-ship.posX*canvas.width, -ship.posY*canvas.height);
			
			context.drawImage(
					spec.image, 
					ship.posX*canvas.width - (ship.width/2),
					ship.posY*canvas.height - (ship.height/2),
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
			
			context.translate(shot.posX*canvas.width, shot.posY*canvas.height);
			context.rotate(shot.rotation);
			context.translate(-shot.posX*canvas.width, -shot.posY*canvas.height);
			
			context.drawImage(
					spec.image, 
					shot.posX*canvas.width - (shot.width/2),
					shot.posY*canvas.height - (shot.height/2),
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

                context.translate(roid.posX*canvas.width, roid.posY*canvas.height);
                context.rotate(roid.rotation);
                context.translate(-roid.posX*canvas.width, -roid.posY*canvas.height);

                context.drawImage(
                    spec.image, 
                    roid.posX*canvas.width - (roid.width/2)*roid.scale,
                    roid.posY*canvas.height - (roid.height/2)*roid.scale,
                    spec.width*roid.scale, 
                    spec.height*roid.scale
                    );
                context.restore();
            };

            return that;
	}
	
	function BackgroundDraw(spec){
		var that = {};
		
		that.draw = function(){
			canvas.width  = 900;//window.innerWidth;
			canvas.height = 600;//window.innerHeight;
			
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
        ShotDraw : ShotDraw
	};
}());
