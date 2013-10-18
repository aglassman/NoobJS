var ObjectGraph = ObjectGraph || {};

ObjectGraph.Node = function(name)
{
	this.id;
	this.name = name;
	this.parent;
	this.children = Array();
	this.process = true;
};

ObjectGraph.ObjectGraph = function () {
	
	this.objectMap = {};
	this.idCounter = -1;

	this.generateId = function ()
	{
		return this.idCounter++;
	};

	this.registerNode = function (node)
	{
		if(this.objectMap[node.id] == null)
		{
			node.id = this.generateId();
			this.objectMap[node.id] = node;
			this.objectMap[node.name] = node;
		}
	};

	this.unRegisterNode = function (node)
	{
		this.objectMap[node.id] = null;
		this.objectMap[node.name] = null;
	};

	this.getNodeByIdOrName = function (key)
	{
		return this.objectMap[key];
	};


	this.attachToNode = function(attachToKey,node)
	{
		var foundNode = this.getNodeByIdOrName(attachToKey);
		if(foundNode != null)
		{
			node.parent = foundNode;
			foundNode.children.push(node);
		}
	};

	this.attachToRoot = function(node)
	{
		this.attachToNode('root',node);
	};

	this.root = new ObjectGraph.Node('root');
	this.registerNode(this.root);

	this.traverseFromRootWithCallback = function(callback)
	{
		this.traverseWithCallback(this.root,callback,'');
	};

	this.traverseWithCallback = function  recurse (node,callback,path) {
		path = path + '.' + node.name;
		//console.log('currentDepth: ' + path);
		callback(node);
		node.children.forEach(function (childNode,index,array) {
			recurse(childNode,callback,path);
		});
	};
};

ObjectGraph.test = function()
{
	var og = new ObjectGraph.ObjectGraph();
	og.attachToRoot(new ObjectGraph.Node('myNode0'));
	og.attachToRoot(new ObjectGraph.Node('myNode1'));
	var node2 = new Node('myNode2');
	og.attachToRoot(node2);
	og.attachToRoot(new ObjectGraph.Node('myNode3'));
	og.attachToRoot(new ObjectGraph.Node('myNode4'));

	
	node2.children.push(new ObjectGraph.Node('woot!'));
	node2.children.push(new ObjectGraph.Node('woot!'));
	node2.children.push(new ObjectGraph.Node('woot!'));

	og.traverseFromRootWithCallback(function(node){console.log('processing: ' + node.name);});

};

