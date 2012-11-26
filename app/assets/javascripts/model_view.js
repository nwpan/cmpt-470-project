var object;

$(function() {
	var renderer = new Renderer($("#canvas")[0]);
	var scene = new Scene();
    renderer.setScene(scene);
    object = scene.createObject();
    object.loadModelFromInput("model");
    setInterval(function() { object.rotateY++; } , 1000 / 60);
    renderer.render();
});