var Game = Game || {};

Game.Ball = function(name,x,y,r,restitution,density,friction)
{
	NoobJS.ObjectGraph.Node.call(this,name);
	this.box2dObj = Game.noobJS.noobBox2d.createCircleBody(x, y, r,restitution,density,friction);
};

Game.Ball.prototype.setLinearVelocity = function(x,y)
{
	if(this.box2dObj.IsSleeping())
		this.box2dObj.WakeUp();
	this.box2dObj.SetLinearVelocity(new b2Vec2(x,y));
};