(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

var Bootstrap2d = Bootstrap2d || {};

Bootstrap2d = function(canvasIds) {
	Bootstrap2d.instance = this;
	this.canvasIds = canvasIds;
	this.canvases = {};
	this.paused = true;
	
	for (var i = 0; i < canvasIds.length; i++) {
		this.canvases[canvasIds[i]] = {};
		this.canvases[canvasIds[i]].canvas = document
				.getElementById(canvasIds[i]);
		this.canvases[canvasIds[i]].ctx = this.canvases[canvasIds[i]].canvas
				.getContext("2d");
		this.canvases[canvasIds[i]].ctx.imageSmoothingEnabled = false;
	}
	;

	this.assetManager = new AssetManager.AssetManager();

	this.objectGraph = new ObjectGraph.ObjectGraph();

	this.drawRect = function(ctx, w, h) {
		ctx.save();

		ctx.translate(0, 0);
		ctx.rotate(0);
		ctx.translate(0, 0);
		ctx.beginPath();
		ctx.rect(0, 0, w, h);
		ctx.fillStyle = "black";
		ctx.fill();

		ctx.restore();
	};

	this.gameLoop = function() {
		
	};

	this.animate = function() {
		var ctx = this.canvases[this.canvasIds[0]].ctx;
		var canvas = this.canvases[this.canvasIds[0]].canvas;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.drawRect(ctx, canvas.width, canvas.height);
		if (!this.assetManager.initialLoadComplete()) {
			ctx.font = "30px Arial";
			ctx.fillStyle = "white";
			ctx
					.fillText("loadingAssets: " + this.assetManager.loadingString,
							40, 40);
		} else {
			this.objectGraph.traverseFromRootWithCallback(function(node) {
				if (!(node.draw === undefined))
					node.draw(ctx);
			});
		}
	};

	window.requestAnimFrame = (function(callback) {
		return window.requestAnimationFrame
				|| window.webkitRequestAnimationFrame
				|| window.mozRequestAnimationFrame
				|| window.oRequestAnimationFrame
				|| window.msRequestAnimationFrame || function(callback) {
					window.setTimeout(callback, 1000 / 60);
				};
	})();
	
	this.startAnimation = function (){
		this.paused = false;
		
		(function loop(){
			Bootstrap2d.instance.gameLoop();
			Bootstrap2d.instance.animate();
			if(!Bootstrap2d.instance.paused)
				requestAnimationFrame(loop);
		})();
	};
	
	this.stopAnimation = function() {
		this.paused = true;
	};
};
