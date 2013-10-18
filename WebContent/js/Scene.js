var Scene = Scene || {};

Scene = function (name,assetsToLoad,sceneGraph) {
	this.name = name;
	this.assetsToLoad = assetsToLoad;
	this.sceneGraph = sceneGraph;
};

var SceneManager = function() {
	this.scenes = [];
};

SceneManager = new SceneManager();