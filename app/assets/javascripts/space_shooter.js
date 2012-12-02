var scene;
var playerObject;
var obstacleModel;
var obstacles =[];

var projectileModel;
var projectileObstacles =[];

var jumping  = false;
var score = 0;
var difficulty = 0;
var life = 3;
var runningLoop;
var renderer;
var dirty = false;
function reset() {
  score = 0;
  difficulty = 0;
  playerObject.x = -8;
  playerObject.y = 2.0;
  scene.objects = [scene.objects[0], scene.objects[1], scene.objects[2]];
  obstacleModel = scene.createObject();
  obstacleModel.y = Math.floor(Math.random()*7)+1;
  obstacleModel.x = 100.0;
  obstacleModel.color = [1.0, 1.0, 0.6];
  obstacleModel.setTexture("assets/crate.jpg");
  obstacles.push(obstacleModel);
  projectileModel = scene.createObject();
  projectileModel.width = 1.5;
  projectileModel.boundWidth = 3.0;
  projectileModel.boundHeight = 1;
  projectileModel.height = 1;
  projectileModel.color = [1.0, 1.0, 0.6];
  projectileModel.loadModelFromJson("bullet");
  projectileObstacles.push(projectileModel);
}
var collision_detect = function(obj1, obj2) {
	
    var hHit = false;
    var vHit = false;

	distx1 = (obj1.x + obj1.boundWidth);
	disty1 = (Math.abs(obj1.y) + obj1.boundHeight/2);
	distx2 = (obj2.x + obj2.boundWidth);
	disty2 = (Math.abs(obj2.y) + obj2.boundHeight/2);
	
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

  dirty = false;
  difficulty+= 1;
  $(".score").html(score);

  if(difficulty % 100 == 0) {
    if(obstacles.length < 100) {
      obstacleModel = scene.createObject();
      obstacleModel.y = Math.floor(Math.random()*7)+1;
      obstacleModel.x = 100.0;
      obstacleModel.width = 2.0;
      obstacleModel.boundWidth = 3.0;
      obstacleModel.color = [1.0, 1.0, 0.6];
      obstacleModel.setTexture("assets/crate.jpg");
      obstacles.push(obstacleModel);
    }
  }

  
  for(var o = 0; o < projectileObstacles.length; o++) {
    for(var i = 0; i < obstacles.length; i++) {
      if (projectileObstacles[o].x >= 12)
      {
        projectileObstacles[o].y = 100;
        projectileObstacles[o].x = 100;
      }
      if (collision_detect(obstacles[i], projectileObstacles[o]))
      {
        score += 100;
        obstacles[i].x = -20;
        projectileObstacles[o].y = 100;
        projectileObstacles[o].x = 100;
      }
      else 
      {
        projectileObstacles[o].x += 1;
      }
    }
  }

  for(var i = 0; i < obstacles.length; i++) {
    var playerCollision = collision_detect(playerObject, obstacles[i]);
  	if(obstacles[i].x <= -20)
  	{
      obstacles[i].y = Math.floor(Math.random()*7)+1;
  	  obstacles[i].x = 100;
  	}

    if (playerCollision)
    {
        $.ajax({
          type: 'POST',
          url: '/high_scores',
          data: {
            high_score: score, 
            game: "Space Shooter"
          },
          success: function(data)
          {
            alert("POSTED. Check high score page...");
          }
        });
        $("#canvas").hide();
        $("#game-over").removeClass("hidden");
        $("#status").addClass("hidden").hide();;
        $(".score").html(score);
        renderer.stopRender();
        clearInterval(runningLoop);
        break;   
    }
    else if (!playerCollision)
    {
      obstacles[i].x -= 1;
    }
  }
}
var cnt = 0;
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
      if (e.keyCode == 38) { //up
        if(playerObject.y < 8) {
          playerObject.y += 1.0;
        }
         return false;
      }
      if (e.keyCode == 40) { //down
        if(playerObject.y > 1) {
          playerObject.y -= 1.0;
        }
         return false;
      }
      if (e.keyCode == 32) { //space
        if (cnt == 10)
          cnt = 0;
        else
          cnt++;
        
        projectileObstacles[cnt].y = playerObject.y;
        projectileObstacles[cnt].x = playerObject.x;

        dirty = true;
        return false;
      }
      if (e.keyCode == 82) { //reset
        reset();
        return false;
      }
  });
  
  renderer = new Renderer($('#canvas')[0]);
  renderer.color = [0,0,0];

  $('#loading').hide();

  scene = renderer.createScene();

  scene.camera([0, 4, 10.0],
      [0.0, 4, -4.0],
      [0.0, 1.0, 0.0]);
  

  playerObject = scene.createObject();
  playerObject.x = -8;
  playerObject.y = 2.0;
  //playerObject.rotateY = 100;
  playerObject.boundHeight = 0.5;
  playerObject.height = 0.5;
  playerObject.loadModelFromJson("spaceship", "assets/spaceship.png");

  /*
  var run = playerObject.createAnimation();
  for(var i = 1; i <= 13; i++ ) {
    run.addFrameFromJson("/run/charrun" + i.toString(), "assets/char.jpg");
  }
  run.speed = 0.5;
  */


  var floorObject = scene.createObject();
  floorObject.y = 0;
  floorObject.width = 1500.0;
  floorObject.depth = 2.0;
  floorObject.boundWidth = 1500.0;
  floorObject.boundDepth = 2.0;
  floorObject.color = [1, 1, 1];

  obstacleModel = scene.createObject();
  obstacleModel.y =  Math.floor(Math.random()*11);
  obstacleModel.x = 300.0;
  obstacleModel.width = 2.0;
  obstacleModel.boundWidth = 3.0;
  obstacleModel.color = [1.0, 1.0, 0.6];
  obstacleModel.setTexture("assets/crate.jpg");

  obstacles.push(obstacleModel);




  for (var i = 0; i < 10; i++)
  {
    projectileModel = scene.createObject();
    projectileModel.width = 1.5;
    projectileModel.boundWidth = 3.0;
    projectileModel.boundHeight = 1;
    projectileModel.height = 1;
    projectileModel.color = [1.0, 1.0, 0.6];
    projectileModel.loadModelFromJson("bullet");
    projectileObstacles.push(projectileModel);
  }

  runningLoop = setInterval(gameLoop, 1000 / 10);

  $("#status").removeClass("hidden").show();
  renderer.render();

  return true;

});
