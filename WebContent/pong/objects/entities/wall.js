var Game = Game || {};

Game.Wall = function(name,color,x,y,w,h)
{
	NoobJS.ObjectGraph.Node.call(this,name);
	this.color = color;
	this.box2dObj = Game.noobJS.noobBox2d.createSolidBox(x,y,w,h);
};