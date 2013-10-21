NoobJS.Editor = function() {
	
	this.bootstrap = new NoobJS.Bootstrap2d(["sceneCanvas"]);
	
	this.buildAssetTree = function()
	{
		/*BuildAssetTree*/
		$("#assetTree").bind("select_node.jstree", function(event, data) {
			$("#assetPreview").empty();
			var key = data.args[0].id;
			NoobJS.Bootstrap2d.instance.assetManager.assets[key].style.width = "100%";
		    $("#assetPreview").append(NoobJS.Bootstrap2d.instance.assetManager.assets[key]);
		});


		$("#assetTree").empty();
		$("<ul/>").appendTo("#assetTree");
		Object.keys(this.bootstrap.assetManager.assets).forEach(function(key,index,array){
			var string = "<li><a id='"+key+"'>" + key + "</a></li>";
			$("#assetTree ul").append(string);
		});
		
		$("#assetTree").jstree({
			core : {}
		});
	};
	
	this.loadScene = function(scene)
	{
		this.bootstrap.assetManager.loadAssets(scene.assetsToLoad);
		this.buildAssetTree();
	};
	
};



	






window.onload = 
$(function() {
	
		var myEditor = new NoobJS.Editor();
		$( "#sortable" ).sortable({
			placeholder: "ui-state-highlight"
		});
		$( "#sortable" ).disableSelection();
		$("#sortable").on("sortdeactivate",function(event,ui){
			console.log("layers re-ordered")
		});

		$( ".column" ).sortable({
			connectWith: ".column"
		});

		$( ".portlet" ).addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
			.find( ".portlet-header" )
				.addClass( "ui-widget-header ui-corner-all" )
				.prepend( "<span class='ui-icon ui-icon-minusthick'></span>")
				.end()
			.find( ".portlet-content" );

		$( ".portlet-header .ui-icon" ).click(function(e) {
			$( this ).toggleClass( "ui-icon-minusthick" ).toggleClass( "ui-icon-plusthick" );
			$( this ).parents( ".portlet:first" ).find( ".portlet-content" ).toggle();
		});

		$( ".column" ).disableSelection();

		/* Find Available Scenes */
		for(var i = 0; i < myEditor.bootstrap.sceneManager.scenes.length; i++)
		{
			var scene = myEditor.bootstrap.sceneManager.scenes[i];
			var sceneName = myEditor.bootstrap.sceneManager.scenes[i].sceneName;
			$("#availableScenes ul").append("<li><a id='"+sceneName+"' href=''>"+sceneName+"</a></li>");
			$("#"+sceneName).on('click',function(e){
				e.preventDefault();
				myEditor.loadScene(scene);
				return false;
			});
		}
		
		/* Build Scene Controls */
		$( "#play" ).button({
		  text: false,
		  icons: {
		    primary: "ui-icon-play"
		  }
		}).click(function(){
			myEditor.bootstrap.startAnimation();
		});
		$( "#stop" ).button({
			  text: false,
			  icons: {
			    primary: "ui-icon-stop"
			  }
			}).click(function(){
				myEditor.bootstrap.stopAnimation();
			});
		
		
	});
