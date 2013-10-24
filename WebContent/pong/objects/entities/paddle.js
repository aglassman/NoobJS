var Game = Game || {};

Game.Paddle = function(name,color,x,y,w,h)
{
	this.y = y;
	this.x = x;
	NoobJS.ObjectGraph.Node.call(this,name);
	this.color = color;
	this.box2dObj = Game.noobJS.noobBox2d.createBoxfunction(this.x, this.y, w, h, true);

	this.updatePaddle = function() {
		remove = this.box2dObj;
		this.box2dObj = Game.noobJS.noobBox2d.createBoxfunction(this.x, this.y, w, h, true);
		Game.noobJS.noobBox2d.world.DestroyBody(remove);
	};
};

