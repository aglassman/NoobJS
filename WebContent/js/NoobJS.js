var NoobJS = function(useBox2d)
{
	this.useBox2d = useBox2d;
	this.bootstrap;
	this.noobBox2d;
};

NoobJS.prototype.createCanvas = function(gameId,w,h)
{
	var canvas = document.createElement('canvas');
	canvas.id = gameId;
	canvas.width = w;
	canvas.height = h;
	document.body.appendChild(canvas);
};

NoobJS.prototype.setGravity = function(gravX,gravY)
{
	this.gravX = gravX;
	this.gravY = gravY;
}

NoobJS.prototype.init = function(gameId,canvasw,canvash)
{
	var gameLoop = function(elapsed){};
	
	this.createCanvas(gameId,canvasw,canvash);
	this.bootstrap = new NoobJS.Bootstrap2d([gameId],gameLoop,true);

	if(this.useBox2d)
	{
		var gravX = this.gravX || 0;
		var gravY = this.gravY || 0;
		this.noobBox2d = new NoobJS.NoobBox2d(gravX,gravY);
		this.bootstrap.world = this.noobBox2d.world;
		this.bootstrap.gameLoop = this.noobBox2d.gameLoop;
	}
	

	
};

NoobJS.prototype.start = function()
{
	this.bootstrap.startAnimation();
}

NoobJS.prototype.stop = function()
{
	this.bootstrap.stopAnimation();
}
