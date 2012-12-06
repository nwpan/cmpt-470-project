$(function() {
	var renderer = new Renderer($("#canvas")[0]);
	var scene = renderer.createScene();
	var object;
	if($('#model').attr("title") == "avatar") {
		object = scene.createAvatar($('#user_id').val());
	} else {
		object = scene.createObject();
    	object.loadModelFromInput("model");
	}
    
    setInterval(function() { object.rotateY++; } , 1000 / 60);
    renderer.render();
});