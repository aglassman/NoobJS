var Game = Game || {};
var toLoad;
var circle;


DSprite = function(name,sprite,initx,inity,radius){
	NoobJS.ObjectGraph.Node(name);
	this.sprite = sprite;
	this.box2dObj = Game.noobBox2d.createBoxfunction(initx, inity, radius, radius, false);
	this.draw = function(ctx)
	{
		var size = 1;
		var x = this.box2dObj.GetCenterPosition().x;
		var y = this.box2dObj.GetCenterPosition().y;
		var r = this.box2dObj.GetRotation();
		this.sprite.drawSprite(ctx,size,size,x,y,r,true,radius,radius);
		//drawBox(ctx,this.box2dObj);
	};
};
DSprite.prototype = new NoobJS.ObjectGraph.Node();

window.onload = new function()
{
	var useBox2d = true;
	Game = new NoobJS(useBox2d);
	
	
	var sceneToLoad = ((function(){ 
		toLoad = new Array();
		
		toLoad.push(new NoobJS.Asset("items", "/img/items.png", "image/png"));
		toLoad.push(new NoobJS.Asset("chars", "/img/chars.png", "image/png"));

		return new NoobJS.Scene("RPG-Test-Scene",toLoad);})());
	
	
	Game.init("testGame", 400, 400);
	
	Game.bootstrap.assetManager.loadAssets(toLoad);
	
	var items = new NoobJS.SpriteSheet(Game.bootstrap.assetManager.getImageAsset("items"), 48, 48, 16, 16);
	var inventory = new NoobJS.SpriteSheet(Game.bootstrap.assetManager.getImageAsset("items"),768,768,1,1);
	this.sprite = new NoobJS.Sprite(items, 8);
	
	var itemNode = new NoobJS.ObjectGraph.Node("item");
	itemNode.r = 0;
	itemNode.index = 0;
	itemNode.spriteSheet = items;
	itemNode.x = 140;
	itemNode.y = 140;
	itemNode.draw = function(ctx)
	{
		this.spriteSheet.drawSprite(ctx,this.spriteSheet,this.index,1,1,this.x,this.y,this.r,true);
	};
	

	
	
	var spriteNode = new NoobJS.ObjectGraph.Node("sprite");
	spriteNode.sprite = this.sprite;
	spriteNode.box2dObj = Game.noobBox2d.createCircleBody(20, 20, 10);
	spriteNode.draw = function(ctx)
	{
		var x = this.box2dObj.GetCenterPosition().x;
		var y = this.box2dObj.GetCenterPosition().y;
		var r = this.box2dObj.GetRotation();
		this.sprite.drawSprite(ctx,1,1,x,y,r,true);
	};
	
	var inventoryNode = new NoobJS.ObjectGraph.Node("inventory");
	inventoryNode.r = 0;
	inventoryNode.spriteSheet = inventory;
	inventoryNode.img = items;
	itemNode.x = 180;
	itemNode.y = 180;
	inventoryNode.draw = function(ctx)
	{
		var size = 350;
		var scale = size/this.img.width;
		var posArray = this.spriteSheet.getItem(itemNode.index);
		
		this.r -=.01;
		ctx.save();
		this.spriteSheet.drawSprite(ctx,this.spriteSheet,0,scale,scale,this.x,this.y,this.r,true);

		ctx.rotate(this.r);
		ctx.translate(this.x,this.y);
		ctx.beginPath();
		ctx.rect(posArray[0]*scale,posArray[1]*scale,posArray[2]*scale,posArray[3]*scale);
		ctx.strokeStyle="red";
		ctx.lineWidt = 2;
		ctx.stroke();
		ctx.restore();
	};
	
	//Game.bootstrap.objectGraph.attachToRoot(itemNode);
	//Game.bootstrap.objectGraph.attachToRoot(inventoryNode);
	//Game.bootstrap.objectGraph.attachToRoot(spriteNode);
	
	function getRandom(max)
	{
		return Math.floor(Math.random()*max);
	}
	
	var width = 10;
	
	setInterval(function(){Game.bootstrap.objectGraph.attachToRoot(new DSprite("node2",new NoobJS.Sprite(items,getRandom(256)),150,0,width));},500);	
	
	Game.noobBox2d.createGround(0,300,800,20);
	//circle = Game.noobBox2d.createCircleBody(20, 20, 10);
	
	Game.start();
};

function drawBox(ctx,box2dObj){
	 
	for (var s = box2dObj.GetShapeList(); s != null; s = s.GetNext()) {

        switch (s.m_type) {
            case b2Shape.e_circleShape:
            {
                drawPerson(ctx,s.m_position.x,s.m_position.y,s.m_body.m_rotation);
                break;
            }
            case b2Shape.e_polyShape:
            {
                var poly = s;
                var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
                ctx.moveTo(tV.x, tV.y);
                for (var i = 0; i < poly.m_vertexCount; i++) {
                    var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                    ctx.lineTo(v.x, v.y);
                }
                ctx.lineTo(tV.x, tV.y);
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 2;
                //ctx.fill();
                ctx.stroke();
                break;
            }
        }
	}
}