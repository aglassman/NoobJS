var Game = Game || {};
window.onload = function()
{
	var useBox2d = true;
	Game.noobJS = new NoobJS(useBox2d);
	Game.noobJS.setGravity(0, 0);
	var w = 600;
	var h = 400;
	Game.noobJS.init("pong",600,400);
	
	var wallHalfWidth = 5;
	
	var wallTop = new Game.Wall("wallTop","yellow",w/2,0,w/2,wallHalfWidth);
	var wallBottom = new Game.Wall("wallBottom","green",w/2,h,w/2,wallHalfWidth);
	var wallLeft = new Game.Wall("wallLeft","blue",0,h/2,wallHalfWidth,h/2);
	var wallRight = new Game.Wall("wallRight","black",w,h/2,wallHalfWidth,h/2);
	
	var paddle1 = new Game.Paddle("paddle1","red",50, 70, 20, 60);
	var paddle2 = new Game.Paddle("paddle2","green",550, 70, 20, 60);
	
	Game.b_restitution = 1;
	Game.b_density = 4;
	Game.b_friction = 0;
	
	Game.ball = new Game.Ball("ball",295, 195, 10,Game.b_restitution,Game.b_density,Game.b_friction);
	
	
	
	Game.noobJS.bootstrap.objectGraph.attachToRoot(wallTop);
	Game.noobJS.bootstrap.objectGraph.attachToRoot(wallBottom);
	Game.noobJS.bootstrap.objectGraph.attachToRoot(wallLeft);
	Game.noobJS.bootstrap.objectGraph.attachToRoot(wallRight);
	
	Game.noobJS.bootstrap.objectGraph.attachToRoot(paddle1);
	Game.noobJS.bootstrap.objectGraph.attachToRoot(paddle2);
	
	Game.noobJS.bootstrap.objectGraph.attachToRoot(Game.ball);
	
	Game.noobJS.start();
	
	Game.ball.setLinearVelocity(200, 200);

	this.addEventListener('mousemove', function(event){
		paddle1.y = event.screenY;
		paddle1.updatePaddle();
	})
};