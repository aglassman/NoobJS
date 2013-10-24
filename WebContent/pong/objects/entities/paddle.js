var Game = Game || {};

Game.Paddle = function(name,color,x,y,w,h)
{
	NoobJS.ObjectGraph.Node.call(this,name);
	this.color = color;
	this.box2dObj = Game.noobJS.noobBox2d.createBoxfunction(x, y, w, h, true);
};

