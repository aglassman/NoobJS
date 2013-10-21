NoobJS.AssetManager = function(assetsToLoad)
{
	this.initLoadCount = 0;
	this.loadingString = "";
	this.assets = {};
	this.loadedAssets = 0;
	
	this.incrementLoaded = function()
	{
		this.loadedAssets++;
		this.loadingString = this.loadedAssets + " / " + this.initLoadCount;
	};
	
	this.loadImageAsset = function(name,src)
	{
		var img = new Image();
		this.assets[name] = img;
		img.onload = this.incrementLoaded();
		img.src = src;
	};

	this.getImageAsset = function(name)
	{
		return this.assets[name];
	};
	
	this.initialLoadComplete = function()
	{
		return this.loadedAssets == this.initLoadCount;
	};
	
	
	this.loadAssets = function(toLoad)
	{
		if(toLoad === undefined)
		{
			this.initLoadCount = 0;
			this.loadingString = "0 / " + this.initLoadCount;
		}
		else
		{
			this.initLoadCount = toLoad.length;
			this.loadingString = "0 / " + this.initLoadCount;
		}
		for(var i = 0; i < toLoad.length; i++)
		{
			this.loadImageAsset(toLoad[i].name,toLoad[i].src);
		}
	};
	
	if(!(assetsToLoad === undefined))
	{
		this.loadAssets(assetsToLoad);
	};
	
};