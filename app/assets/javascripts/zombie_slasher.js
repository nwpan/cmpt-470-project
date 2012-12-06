var testScene;
var playerObject;
var obstacleModel;
var obstacles =[];
var jumping  = false;
var score = 0;
var life = 3;
var runningLoop;
var renderer;
var zombie;

function reset() {
  score = 0;
  obstacles = [];
  jumping = false;
  score = 0;
  playerObject.z = -4.0;
  testScene.objects = [testScene.objects[0], testScene.objects[1], testScene.objects[2], testScene.objects[3]];
  obstacleModel = testScene.createObject();
  obstacleModel.z = Math.floor(Math.random()*3)*2-6;
  obstacleModel.x = 300.0;
  obstacleModel.color = [1.0, 1.0, 0.6];
  obstacleModel.setTexture("assets/crate.jpg");
  testScene.objects.push(obstacleModel);
  obstacles.push(obstacleModel);
}

var collision_detect = function(obj1, obj2) {
	
    var hHit = false;
    var vHit = false;

	distx1 = (obj1.x + obj1.boundWidth);
	disty1 = 2*(Math.abs(obj1.y) + obj1.boundHeight/2);
	distx2 = (obj2.x + obj2.boundWidth);
	disty2 = 2*(Math.abs(obj2.y) + obj2.boundHeight/2);
	
	if (obj1.x <= distx2 && obj2.x <= distx1){
		hHit = true;
	}	
	if (Math.abs(obj1.y) <= disty2 && Math.abs(obj2.y) <= disty1){
		vHit = true;
	}

    if (hHit == true && vHit == true)
        return true;
    
	return false;
}

function gameLoop() {
	//game logic here
  if(playerObject.currentAnimation == 2 && playerObject.animations[playerObject.currentAnimation].isComplete()) {
    playerObject.changeAnimation(0);
  }

  if(zombie.x < playerObject.x*1.2) {
    zombie.rotateY = 90;
    zombie.x += 0.01;
  }
  if(zombie.x > playerObject.x*1.2) {
    zombie.rotateY = -90;
    zombie.x -= 0.01;
  }
  if(zombie.z < playerObject.z*1.2) {
    zombie.rotateY = 0;
    zombie.z += 0.01;
  }
  if(zombie.z > playerObject.z*1.2) {
    zombie.rotateY = 180;
    zombie.z -= 0.01;
  }

}

$(function() {

  $("#play-again").click(function(ev) {
    reset();
    runningLoop = setInterval(gameLoop, 1000 / 60);
    renderer.render();
    $("#canvas").show();
    $("#game-over").addClass("hidden");
    $("#status").removeClass("hidden").show();
  });

  $(document).keydown(function(e){
      console.log(playerObject.x + "," + playerObject.z);
      if (e.keyCode == 37) { //left
          playerObject.rotateY = 180;
          if(playerObject.z > -12) {
            playerObject.z-= 0.7;
          }
      }
      if (e.keyCode == 39) { //right
          playerObject.rotateY = 0;
          if(playerObject.z < 12) {
            playerObject.z+= 0.7;
          }
      }
      if (e.keyCode == 40) { //down
          playerObject.rotateY = -90;
          if(playerObject.x > -6) {
            playerObject.x-= 0.7;
          }
      }
      if (e.keyCode == 38) { //up
          playerObject.rotateY = 90;
          if(playerObject.x < 7) {
            playerObject.x+= 0.7;
          }
      }
      if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 38) { 
        if(playerObject.currentAnimation != 1) {
          playerObject.changeAnimation(1);
        }
      }

      if (e.keyCode == 32) { //space
            playerObject.changeAnimation(2);
      }
  });

  $(document).keyup(function(e){
      if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 38) { 
        playerObject.changeAnimation(0);
      }
  });
  
  renderer = new Renderer($('#canvas')[0]);


  $('#loading').hide();

  testScene = renderer.createScene();

  testScene.camera([-2.0, 10.0, 0.0],
      [0.0, 0.0, 0.0],
      [0.0, 1.0, 0.0]);

  var idle = new Animation(109, 160);
  var run = new Animation(162, 211);
  run.speed = 0.7;
  var slash = new Animation(214, 245);
  slash.loop = false;
  var zombieRun = new Animation(252, 351);
  zombieRun.speed = 0.8;
  

  playerObject = testScene.createAvatar($('#user_id').val());
  playerObject.boundHeight = 1.3;
  playerObject.animations.push(idle);
  playerObject.animations.push(run);
  playerObject.animations.push(slash);
  //playerObject.skinColor = [0.7, 1.0, 0.5];
  playerObject.loadPropFromAjax("sword", "hand_r");

  zombie = testScene.createAvatar($('#user_id').val());
  zombie.boundHeight = 1.3;
  zombie.animations.push(zombieRun);
  zombie.skinColor = [0.7, 1.0, 0.5];



  var testObject3 = testScene.createObject();
  testObject3.z = -4.0;
  testObject3.y = -2.0;
  testObject3.width = 500.0;
  testObject3.depth = 500.0;
  testObject3.boundWidth = 500.0;
  testObject3.boundDepth = 500.0;
  testObject3.color = [0.5, 0.5, 0.5];

  obstacles.push(obstacleModel);

  runningLoop = setInterval(gameLoop, 1000 / 60);

  $("#status").removeClass("hidden").show();
  renderer.render();

  return true;

});
