NoobJS.NoobBox2d = function (gravX,gravY)
{
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(gravX, gravY);
	var doSleep = true;
	this.world = new b2World(worldAABB, gravity, doSleep); 
};

NoobJS.NoobBox2d.prototype.previousElapsed = 0;

NoobJS.NoobBox2d.prototype.createSolidBox = function (x,y,w,h) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(w, h);
	groundSd.restitution = 0.8;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(x, y);
	return this.world.CreateBody(groundBd);
};

NoobJS.NoobBox2d.prototype.createCircleBody = function (x,y,radius,restitution,density,friction)
{
	var circleSd = new b2CircleDef();
	circleSd.density = density;
	circleSd.radius = radius;
	circleSd.restitution = restitution;
	circleSd.friction = friction;
	var circleBd = new b2BodyDef();
	circleBd.AddShape(circleSd);
	circleBd.position.Set(x,y);
	return this.world.CreateBody(circleBd);
};

NoobJS.NoobBox2d.prototype.createBoxfunction = function (x, y, width, height, fixed) {
	if (typeof(fixed) == 'undefined') fixed = true;
	var boxSd = new b2BoxDef();
	if (!fixed) boxSd.density = 1.0;
	boxSd.extents.Set(width, height);
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(x,y);
	return this.world.CreateBody(boxBd);
};

var timeStep = 1/60;

NoobJS.NoobBox2d.prototype.gameLoop = function(elapsed){
	if(!(this.world === undefined || elapsed === undefined))
	{
		this.previousElapsed = elapsed;
		var iteration = 1;
		this.world.Step(timeStep, iteration);

	}
};