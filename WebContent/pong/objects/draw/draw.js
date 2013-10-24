var Game = Game || {};

Game.Paddle.prototype.draw = function(ctx)
{
	ctx.save();
	for (var s = this.box2dObj.GetShapeList(); s != null; s = s.GetNext()) {
		
        var poly = s;
        var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
        
        ctx.moveTo(tV.x, tV.y);
        ctx.beginPath();
        for (var i = 0; i < poly.m_vertexCount; i++) {
            var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
            ctx.lineTo(v.x, v.y);
        }
        ctx.lineTo(tV.x, tV.y);
        ctx.closePath();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
	}
	ctx.restore();
};

Game.Wall.prototype.draw = Game.Paddle.prototype.draw;

Game.Ball.prototype.draw = function(ctx)
{
	var shape = this.box2dObj.GetShapeList();
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.translate(shape.m_position.x,shape.m_position.y);
    ctx.rotate(shape.m_body.m_rotation);
    ctx.beginPath();
    ctx.arc(0,0,shape.m_radius,0,Math.PI*2,true);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.stroke();

    ctx.restore();
};