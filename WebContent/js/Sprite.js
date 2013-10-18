function SpriteSheet(image,spritew,spriteh,numx,numy)
{
	this.image = image;
	this.spritew = spritew;
	this.spriteh = spriteh;
	this.numx = numx;
	this.numy = numy;

	this.getItem = function(index)
	{
		var positionArray = new Array(8);
		positionArray[0] = (index % numx) * this.spritew; //sx
		positionArray[1] = Math.floor(index / numy) * this.spriteh; //sy
		positionArray[2] = this.spritew; //sw
		positionArray[3] = this.spriteh; //sh
		positionArray[4] = 0; //dx
		positionArray[5] = 0; //dy
		positionArray[6] = this.spritew; //dw
		positionArray[7] = this.spriteh; //dh
		return positionArray;
	}


}

function drawImage(ctx,img,posArray,sx,sy,tx,ty,r,centered)
{
	ctx.save();
	if(centered)
	{
		posArray[4]=posArray[6]/-2;
		posArray[5]=posArray[7]/-2;
	}
	ctx.scale(sx,sy);
	ctx.translate(tx,ty);
	ctx.rotate(r);
	
	ctx.drawImage(
			img,
			posArray[0],
			posArray[1],
			posArray[2],
			posArray[3],
			posArray[4],
			posArray[5],
			posArray[6],
			posArray[7]);
	
	ctx.restore();
}

function drawSprite(ctx,spriteSheet,index,sx,sy,tx,ty,r,centered)
{
	drawImage(
		ctx,
		spriteSheet.image,
		spriteSheet.getItem(index),
		sx,sy,tx,ty,r,centered);
}