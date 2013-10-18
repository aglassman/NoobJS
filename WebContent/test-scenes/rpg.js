

SceneManager.scenes.push((function(){ 
	var toLoad = new Array();
	toLoad[0] = new Object();
	toLoad[0].name = "items";
	toLoad[0].src = "img/items.png";
	
	toLoad[1] = new Object();
	toLoad[1].name = "chars";
	toLoad[1].src = "img/chars.png";
	
	var sceneGraph = {};
	
	return new Scene("rpg test 1",toLoad,sceneGraph);})());



window.onload = function()
{
//	Game.bootstrap = new Bootstrap2d(["mainCanvas"]);
//	bootstrap = Game.bootstrap;
//	
//	var toLoad = new Array();
//	toLoad[0] = new Object();
//	toLoad[0].name = "items";
//	toLoad[0].src = "img/items.png";
//	
//	bootstrap.assetManager.loadAssets(toLoad);
//	
//	var items = new SpriteSheet(bootstrap.assetManager.getImageAsset("items"), 48, 48, 16, 16);
//	var inventory = new SpriteSheet(bootstrap.assetManager.getImageAsset("items"),768,768,1,1);
//	
//	var itemNode = new ObjectGraph.Node("item");
//	itemNode.r = 0;
//	itemNode.index = 0;
//	itemNode.spriteSheet = items;
//	itemNode.x = 180;
//	itemNode.y = 180;
//	itemNode.draw = function(ctx)
//	{
//		drawSprite(ctx,this.spriteSheet,this.index,1,1,this.x,this.y,this.r,true);
//	};
//	
//	var inventoryNode = new ObjectGraph.Node("inventory");
//	inventoryNode.r = 0;
//	inventoryNode.spriteSheet = inventory;
//	inventoryNode.img = items;
//	itemNode.x = 180;
//	itemNode.y = 180;
//	inventoryNode.draw = function(ctx)
//	{
//		var size = 350;
//		var scale = size/this.img.width;
//		var posArray = this.spriteSheet.getItem(itemNode.index);
//		
//		this.r -=.01;
//		ctx.save();
//		drawSprite(ctx,this.spriteSheet,0,scale,scale,this.x,this.y,this.r,false);
//
//		ctx.rotate(this.r);
//		ctx.translate(this.x,this.y);
//		ctx.beginPath();
//		ctx.rect(posArray[0]*scale,posArray[1]*scale,posArray[2]*scale,posArray[3]*scale);
//		ctx.strokeStyle="red";
//		ctx.lineWidt = 2;
//		ctx.stroke();
//		ctx.restore();
//	};
//	
//	bootstrap.objectGraph.attachToRoot(itemNode);
//	bootstrap.objectGraph.attachToRoot(inventoryNode);
//	
//	bootstrap.startAnimation();
};