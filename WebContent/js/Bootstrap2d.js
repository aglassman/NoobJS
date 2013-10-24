(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

NoobJS.Bootstrap2d = function(canvasIds,gameLoop,smoothingEnabled) {
	
	NoobJS.Bootstrap2d.instance = this;
	this.smoothingEnabled = smoothingEnabled;
	this.canvasIds = canvasIds;
	this.canvases = {};
	this.paused = true;
	
	for (var i = 0; i < canvasIds.length; i++) {
		this.canvases[canvasIds[i]] = {};
		this.canvases[canvasIds[i]].canvas = document
				.getElementById(canvasIds[i]);
		this.canvases[canvasIds[i]].ctx = this.canvases[canvasIds[i]].canvas
				.getContext("2d");
		this.canvases[canvasIds[i]].ctx.imageSmoothingEnabled = this.smoothingEnabled;
	};
	
	this.toggleSmoothing = function()
	{
		for (var i = 0; i < canvasIds.length; i++) {
			this.canvases[canvasIds[i]].ctx.imageSmoothingEnabled = !this.canvases[canvasIds[i]].ctx.imageSmoothingEnabled;
		}
	};

	this.assetManager = new NoobJS.AssetManager();

	this.objectGraph = new NoobJS.ObjectGraph();

	this.gameLoop = gameLoop;

	this.animate = function(elapsed) {
		var ctx = this.canvases[this.canvasIds[0]].ctx;
		var canvas = this.canvases[this.canvasIds[0]].canvas;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
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
				
		(function loop(elapsed){


			NoobJS.Bootstrap2d.instance.gameLoop(elapsed);
			NoobJS.Bootstrap2d.instance.animate(elapsed);
			
			if(!NoobJS.Bootstrap2d.instance.paused)
				requestAnimationFrame(loop);
		})();
	};
	
	this.stopAnimation = function() {
		this.paused = true;
	};
};
