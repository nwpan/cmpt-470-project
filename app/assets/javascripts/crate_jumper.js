$(function() {  
  var scene;
  var playerObject;
  var obstacleModel;
  var obstacles =[];
  var jumping  = false;
  var score = 0;
  var life = 3;
  var runningLoop;
  var renderer;

  function reset() {
    score = 0;
    obstacles = [];
    jumping = false;
    score = 0;
    playerObject.z = -4.0;
    scene.objects = [scene.objects[0], scene.objects[1], scene.objects[2], scene.objects[3]];
    obstacleModel = scene.createObject();
    obstacleModel.z = Math.floor(Math.random()*3)*2-6;
    obstacleModel.x = 300.0;
    obstacleModel.color = [1.0, 1.0, 0.6];
    obstacleModel.setTexture("assets/crate.jpg");
    scene.objects.push(obstacleModel);
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

    score++;
    $(".score").html(score);

    if(score % 500 == 0) {
      if(obstacles.length < 100) {
        obstacleModel = scene.createObject();
        obstacleModel.z = Math.floor(Math.random()*3)*2-6;
        obstacleModel.x = 300.0;
        obstacleModel.width = 2.0;
        obstacleModel.boundWidth = 3.0;
        obstacleModel.color = [1.0, 1.0, 0.6];
        obstacleModel.setTexture("assets/crate.jpg");
        obstacles.push(obstacleModel);
      }
    }

    for(var i = 0; i < obstacles.length; i++) {
    	if(obstacles[i].x <= -20)
    	{
        obstacles[i].z = Math.floor(Math.random()*3)*2-6;
    	  obstacles[i].x = 300;
    	}
      if (!collision_detect(playerObject, obstacles[i]) || playerObject.z != obstacles[i].z)
      {
          obstacles[i].x-= 1;
          continue;
      }
      else if (collision_detect(playerObject, obstacles[i]))
      {
          $.ajax({
            type: 'POST',
            url: '/high_scores',
            data: {
              high_score: score, 
              game: "Crate Jumper"
            },
            success: function(data)
            {
              
            }
          });
          $("#canvas").hide();
          $("#game-over").removeClass("hidden");
          $("#status").addClass("hidden").hide();
          $(".score").html(score);
          renderer.stopRender();
          clearInterval(runningLoop);
          break;   
      }
    }


  	if(playerObject.y > 0 && !jumping) {
  		playerObject.y-= 0.5/playerObject.y/5;
  	}

  	if(playerObject.y < 0 + playerObject.boundHeight/2) {
  		playerObject.y = 0 + playerObject.boundHeight/2;
      if(playerObject.currentAnimation == 1) {
        playerObject.changeAnimation(0);
      }
  	}

  	if(jumping)
  	{
  		if(playerObject.y < 2.5) {
  			playerObject.y += 0.2/playerObject.y/2;
        playerObject.x += 0.05;
  		} else {
  			jumping = false;
  		}
  	}

    if ( playerObject.x > -5.0) {
      playerObject.x -= 0.01;
      if(playerObject.x < -5.0) {
        playerObject.x = -5.0;
      }
    }
  }



  $("#play-again").click(function(ev) {
    reset();
    runningLoop = setInterval(gameLoop, 1000 / 60);
    renderer.render();
    $("#canvas").show();
    $("#game-over").addClass("hidden");
    $("#status").removeClass("hidden").show();
  });

  $(document).keydown(function(e){
      if (e.keyCode == 37) { //left
        if(playerObject.z > -6.0) {
          playerObject.z -= 2.0;
        }
         return false;
      }
      if (e.keyCode == 39) { //right
        if(playerObject.z < -2.0) {
          playerObject.z += 2.0;
        }
         return false;
      }
      if (e.keyCode == 32 || e.keyCode == 38) { //space or up
      	if(!jumping && playerObject.y == 0 + playerObject.boundHeight/2 && playerObject.currentAnimation == 0) {
          jumping = true;
          playerObject.changeAnimation(1);
     	}
         return false;
      }
      if (e.keyCode == 82) { //space or up
        reset();
         return false;
      }
  });
  
  renderer = new Renderer($('#canvas')[0]);


  $('#loading').hide();

  scene = renderer.createScene();

  scene.camera([-5.0, 3.0, 2.0],
      [0.0, 0.0, -4.0],
      [0.0, 1.0, 0.0]);

  var run = new Animation(4, 54);
  var jump = new Animation(60, 100);
  jump.loop = false;
  jump.speed = 0.8;
  

  playerObject = scene.createAvatar($('#user_id').val());
  playerObject.z = -4.0;
  playerObject.x = -5;
  playerObject.y = 2.0;
  playerObject.rotateY = 100;
  playerObject.boundHeight = 1.3;
  playerObject.animations.push(run);
  playerObject.animations.push(jump);


  var testObject3 = scene.createObject();
  testObject3.z = -4.0;
  testObject3.y = -1.0;
  testObject3.width = 500.0;
  testObject3.depth = 2.0;
  testObject3.boundWidth = 500.0;
  testObject3.boundDepth = 2.0;
  testObject3.color = [0.8, 0.5, 0.5];

  var testObject4 = scene.createObject();
  testObject4.z = -6.0;
  testObject4.y = -1.0;
  testObject4.width = 500.0;
  testObject4.depth = 2.0;
  testObject4.boundWidth = 500.0;
  testObject4.boundDepth = 2.0;
  testObject4.color = [0.5, 0.8, 0.5];

  var testObject5 = scene.createObject();
  testObject5.z = -2.0;
  testObject5.y = -1.0;
  testObject5.width = 500.0;
  testObject5.depth = 2.0;
  testObject5.boundWidth = 500.0;
  testObject5.boundDepth = 2.0;
  testObject5.color = [0.5, 0.5, 0.8];

  obstacleModel = scene.createObject();
  obstacleModel.z =  Math.floor(Math.random()*3)*2-6;
  obstacleModel.x = 300.0;
  obstacleModel.width = 2.0;
  obstacleModel.boundWidth = 3.0;
  obstacleModel.color = [1.0, 1.0, 0.6];
  obstacleModel.setTexture("assets/crate.jpg");

  obstacles.push(obstacleModel);

  runningLoop = setInterval(gameLoop, 1000 / 60);

  $("#status").removeClass("hidden").show();
  renderer.render();

  return true;

});
