NoobJS.Scene = function (sceneName,assetsToLoad) {
	this.sceneName = sceneName;
	this.assetsToLoad = assetsToLoad;
};

NoobJS.SceneManager = function() {
	this.scenes = [];
};

NoobJS.Asset = function(name,src,type) {
	this.name = name;
	this.src = src;
	this.type = type;
};
