NoobJS.NoobBox2d = function ()
{
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	this.world = new b2World(worldAABB, gravity, doSleep); 
};

NoobJS.NoobBox2d.prototype.previousElapsed = 0;

NoobJS.NoobBox2d.prototype.createGround = function (x,y,w,h) {
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(w, h);
	groundSd.restitution = 0.8;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(x, y);
	this.world.CreateBody(groundBd);
};

NoobJS.NoobBox2d.prototype.createCircleBody = function (x,y,r)
{
	var circleSd = new b2CircleDef();
	circleSd.density = 6;
	circleSd.radius = r;
	circleSd.restitution = .2;
	circleSd.friction = 1.0;
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
		//var ctx = NoobJS.Bootstrap2d.instance.canvases[this.canvasIds[0]].ctx;
		//var canvas = NoobJS.Bootstrap2d.instance.canvases[this.canvasIds[0]].canvas;
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		//ctx.beginPath();
		//timeStep = 1/60;(elapsed - this.previousElapsed)/1000;
		this.previousElapsed = elapsed;
		var iteration = 1;
		this.world.Step(timeStep, iteration);
//		for (var b = this.world.m_bodyList; b; b = b.m_next) {
//			for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
//				switch (s.m_type) {
//	                case b2Shape.e_circleShape:
//	                {
//	                	drawPerson(ctx,s.m_position.x,s.m_position.y,s.m_body.m_rotation);
//	                    break;
//	                }
//	                case b2Shape.e_polyShape:
//	                {
//	                    var poly = s;
//	                    var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
//	                    ctx.moveTo(tV.x, tV.y);
//	                    for (var i = 0; i < poly.m_vertexCount; i++) {
//	                        var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
//	                        ctx.lineTo(v.x, v.y);
//	                    }
//	                    ctx.lineTo(tV.x, tV.y);
//	                    ctx.strokeStyle = "blue";
//	                    ctx.lineWidth = 2;
//	                    ctx.fill();
//	                    ctx.stroke();
//	                	break;
//	                }
//	            }
//			}		
//		}
	}
};

function drawPerson(ctx,x,y,r)
{
	//console.log("x: " + x + " y: "+ y)
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.translate(x,y);
    ctx.rotate(r);
    ctx.beginPath();
    ctx.arc(0,0,10,0,Math.PI*2,true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0,-5,5,0,Math.PI*2,true);
    ctx.moveTo(0,0);
    ctx.lineTo(0,5);
    ctx.moveTo(-5,3);
    ctx.lineTo(5,3);
    ctx.moveTo(0,5);
    ctx.lineTo(-5,10);
    ctx.moveTo(0,5);
    ctx.lineTo(5,10);
    //ctx.arc(200,50,20,0,Math.PI*2,true);
    ctx.stroke();
    ctx.restore();
}