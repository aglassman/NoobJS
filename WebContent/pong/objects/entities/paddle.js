var Game = Game || {};

Game.Paddle = function(name,color,x,y,w,h)
{
	this.y = y;
	this.x = x;
	NoobJS.ObjectGraph.Node.call(this,name);
	this.color = color;
	this.box2dObj = Game.noobJS.noobBox2d.createBoxfunction(this.x, this.y, w, h, true);

	this.updatePaddle = function() {
		// Activate static flag if it isn't already
		this.m_flags = this.m_flags | b2Body.e_staticFlag;
		this.box2dObj.m_position.y = this.y;
		this.box2dObj.SynchronizeShapes()
		// Remove flag, don't have to check, since it's bitwise
		this.m_flags = this.m_flags & ~b2Body.e_staticFlag;
	};
};

