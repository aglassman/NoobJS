var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
var currentIndex = 0;

setupMouseClickListener(canvas);

var assetManager = new AssetManager();
assetManager.loadImageAsset("items","img/items.png");
//need some kind of callback to ensure assets are loaded before proceeding.


var spriteSheet = new SpriteSheet(assetManager.getImageAsset("items"),48,48,16,16);

function clearCanvas()
{
	ctx.clearRect(0, 0,canvas.width,canvas.height);
}

function loadItem(index)
{

	//var p = getItem(index);
	//posArray = p;
    //console.log(currentIndex + " " + posArray);
    clearCanvas();
	drawSprite(ctx,spriteSheet,currentIndex,1,1,0,0,0);
	drawSprite(ctx,spriteSheet,currentIndex,2,2,48,0,0);
	drawSprite(ctx,spriteSheet,currentIndex,5,5,96,0,0);
	//drawIndex(ctx,p);
}

document.onkeydown = checkKey;

function checkKey(e) {
	e = e || window.event;

    if (e.keyCode == '37') {
        // left arrow
        if(currentIndex != 0)
        	currentIndex--;
    }
    else if (e.keyCode == '38') {
    	// up arrow
        if(Math.floor(currentIndex / 16 ) > 0)
        	currentIndex -= 16;
    }
    else if (e.keyCode == '39') {
    	// right arrow
        if(currentIndex < 255)
        	currentIndex++;
    }
    else if (e.keyCode == '40') {
    	// down arrow
        if(currentIndex < (255-16))
        	currentIndex += 16;
    }
    loadItem(currentIndex);
}

function drawIndex(ctx,posArray)
{
	var initX = 60;
	var initY = 60;
	var size = 256;
	var scale = size/img.width;
	var pix = 1;
	ctx.save();

	ctx.translate(initX,initY);
	ctx.drawImage(img,0,0,img.width,img.height,0,0,size,size);
	ctx.beginPath();
	ctx.rect(posArray[0]*scale,posArray[1]*scale,posArray[2]*scale,posArray[3]*scale);
	ctx.strokeStyle="red";
	ctx.lineWidt = 2;
	ctx.stroke();
	ctx.restore();
}