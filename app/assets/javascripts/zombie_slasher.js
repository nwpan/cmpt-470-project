$(function() {  
  var scene;
  var playerObject;
  var attack  = false;
  var score = 0;
  var runningLoop;
  var renderer;
  var zombies = [];
  var timer = 0;
  var swordCollide = {x: 0, y: 0, z: 1.0, boundHeight: 1.0, boundWidth: 2.5, boundDepth: 2.5};
  var keyUp = false;
  var keyDown = false;
  var keyLeft = false;
  var keyRight = false;
  var avatars;

  function reset() {
    score = 0;
    $(".score").html(score);
    zombies = [];
    attack = false;
    playerObject.z = 0;
    playerObject.x = 0;
    scene.objects = [scene.objects[0], scene.objects[1]];
  }

  var generateZombie = function() {
    if(zombies.length < 30) {
      var zombie = scene.createAvatar(avatars[Math.floor(Math.random()*avatars.length)].id);
      if(Math.random() > 0.5) {
        if(Math.random() > 0.5) {
          zombie.x = 15;
        }else {
          zombie.x = -15;
        }
        zombie.z = Math.random()*14 - 7;
      } else {
        zombie.x = Math.random()*30 - 15;
        if(Math.random() > 0.5) {
          zombie.z = 12;
        }else {
          zombie.z = -12;
        }
      }
      zombie.boundHeight = 1.3;
      var zombieRun = new Animation(252, 351);
      zombieRun.speed = 0.8;
      zombie.animations.push(zombieRun);
      var zombieDie = new Animation(354, 397);
      zombieDie.loop = false;
      zombie.animations.push(zombieDie);
      var zombieRevive = new Animation(399, 462);
      zombieRevive.loop = false;
      zombie.animations.push(zombieRevive);
      zombie.dead = false;
      zombie.skinColor = [0.7, 1.0, 0.5];
      zombies.push(zombie);
    } else {
      var deadZombie;
        for(var zombie in zombies) {
          zombie = zombies[zombie];
          if(zombie.y < 0) {
            deadZombie = zombie;
            break;
          }
        }
        if(typeof deadZombie != "undefined") {
          if(Math.random() > 0.5) {
            if(Math.random() > 0.5) {
              zombie.x = 15;
            }else {
              zombie.x = -15;
            }
            zombie.z = Math.random()*40 - 20;
          } else {
            zombie.x = Math.random()*40 - 20;
            if(Math.random() > 0.5) {
              zombie.z = 25;
            }else {
              zombie.z = -25;
            }
          }
          zombie.y=0;
        }
    }
  };

  var collision_detect = function(obj1, obj2) {
  	if(obj1.y == obj2.y) {
      if(obj2.x < obj1.x + obj1.boundWidth/2 && obj2.x > obj1.x - obj1.boundWidth/2) {
        if(obj2.z < obj1.z + obj1.boundDepth/2 && obj2.z > obj1.z - obj1.boundDepth/2) {
          return true;
        }
      }
    }
    return false;
  }

  function gameLoop() {
  	//game logic here
    if(timer % 300 === 0) {
        generateZombie();

      for(var zombie in zombies) {
        zombie = zombies[zombie];
        if(zombie.dead) {
          var chance = score / 50000;
          if(chance < 0.01) {
            chance = 0.01;
          } else if(chance > 0.5){
            chance = 0.5;
          }

          if(Math.random() <= chance) {
            zombie.dead = false;
            zombie.changeAnimation(2);
          }
        }
      }
    }
    timer++;

    if(timer % 120 === 0) {
      for(var zombie in zombies) {
        zombie = zombies[zombie];
        if(zombie.dead) {
          if(Math.random() <= 0.05) {
            zombie.dead = false;
            zombie.changeAnimation(2);
            break;
          }
        }
      }
    }

    if(!attack) {
          if (keyLeft) { //left
              playerObject.rotateY = 180;
              if(playerObject.z > -12) {
                playerObject.z-= 0.12;
              }
              swordCollide.x = playerObject.x;
              swordCollide.z = playerObject.z - 1.0;
          }
          if (keyRight) { //right
              playerObject.rotateY = 0;
              if(playerObject.z < 12) {
                playerObject.z+= 0.12;
              }
              swordCollide.x = playerObject.x;
              swordCollide.z = playerObject.z + 1.0;
          }
          if (keyDown) { //down
              playerObject.rotateY = -90;
              if(playerObject.x > -8) {
                playerObject.x-= 0.12;
              }
              swordCollide.x = playerObject.x - 1.0;
              swordCollide.z = playerObject.z;
          }
          if (keyUp) { //up
              playerObject.rotateY = 90;
              if(playerObject.x < 8) {
                playerObject.x+= 0.12;
              }
              swordCollide.x = playerObject.x + 1.0;
              swordCollide.z = playerObject.z;
          }
          if (keyUp || keyDown || keyLeft || keyRight) {
            if(playerObject.currentAnimation != 1) {
              playerObject.changeAnimation(1);
            }
          } else {
            if(playerObject.currentAnimation !== 0) {
              playerObject.changeAnimation(0);
            }
          }
        }

    if(playerObject.currentAnimation == 2 && playerObject.animations[playerObject.currentAnimation].isComplete()) {
      attack = false;
      playerObject.changeAnimation(0);
    }

    for(var zombie in zombies) {
      zombie = zombies[zombie];

      if(zombie.dead) {
          continue;
        }

      if(zombie.currentAnimation == 2) {
        if(zombie.animations[zombie.currentAnimation].isComplete()) {
          zombie.changeAnimation(0);
        }
        continue;
      }

      if(attack && collision_detect(zombie, swordCollide) && playerObject.animations[playerObject.currentAnimation].currentFrame > 10) {
        score += 100;
        $(".score").html(score);
        zombie.changeAnimation(1);
        zombie.dead = true;
        continue;
      }

      if(collision_detect(zombie, playerObject)) {
        $.ajax({
            type: 'POST',
            url: '/high_scores',
            data: {
              high_score: score, 
              game: "Zombie Slasher"
            },
            success: function(data)
            {
              $("#credits a").html("Credits: " + data);
            }
          });
          $("#canvas").hide();
          $("#game-over").removeClass("hidden").css("-webkit-transform", "scale3d(1,1,1)");;
          $("#status").addClass("hidden").hide();
          $(".score").html(score);
          renderer.stopRender();
          clearInterval(runningLoop);
          break; 
      }

      var zombieCollide = false;
      for(var otherZombie in zombies) {
        otherZombie = zombies[otherZombie];
        if(otherZombie != zombie && !otherZombie.dead && collision_detect(zombie, otherZombie)) {
          zombieCollide = otherZombie;
          break;
        }
      }

      if(!zombieCollide) {
        var angle = Math.atan2((playerObject.x - zombie.x), (playerObject.z - zombie.z)) * (180/Math.PI);
        zombie.rotateY = angle;
        if(zombie.x < playerObject.x) {
          zombie.x += 0.01;
        }
        if(zombie.x > playerObject.x) {
          zombie.x -= 0.01;
        }
        if(zombie.z < playerObject.z) {
          zombie.z += 0.01;
        }
        if(zombie.z > playerObject.z) {
          zombie.z -= 0.01;
        }
      } else {
        var angle = Math.atan2((zombie.x - zombieCollide.x), (zombie.z - zombieCollide.z)) * (180/Math.PI);
        zombie.rotateY = angle;
        if(zombie.x < zombieCollide.x) {
          zombie.x -= 0.01;
        }
        if(zombie.x > zombieCollide.x) {
          zombie.x += 0.01;
        }
        if(zombie.z < zombieCollide.z) {
          zombie.z -= 0.01;
        }
        if(zombie.z > zombieCollide.z) {
          zombie.z += 0.01;
        }
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

  avatars = JSON.parse($("#avatars").val()).avatars;


  $(document).keydown(function(e){
      if(!attack) {
        if (e.keyCode == 37) { //left
            keyLeft = true;
        }
        if (e.keyCode == 39) { //right
            keyRight = true;
        }
        if (e.keyCode == 40) { //down
            keyDown = true;
        }
        if (e.keyCode == 38) { //up
            keyUp = true;
        }

        if (e.keyCode == 32) { //space
            attack = true;
            keyUp = keyDown = keyLeft = keyRight = false;
            playerObject.changeAnimation(2);
        }
      }
  });

  $(document).keyup(function(e){
    if(!attack) {
      if (e.keyCode == 37) { //left
            keyLeft = false;
        }
        if (e.keyCode == 39) { //right
            keyRight = false;
        }
        if (e.keyCode == 40) { //down
            keyDown = false;
        }
        if (e.keyCode == 38) { //up
            keyUp = false;
        }
    }
  });
  
  renderer = new Renderer($('#canvas')[0]);


  $('#loading').hide();

  scene = renderer.createScene();

  scene.camera([-4.0, 10.0, 0.0],
      [0.0, 0.0, 0.0],
      [0.0, 1.0, 0.0]);

  var idle = new Animation(109, 160);
  var run = new Animation(162, 211);
  var slash = new Animation(220, 245);
  slash.speed = 1.2;
  slash.loop = false;
  

  playerObject = scene.createAvatar($('#user_id').val());
  playerObject.boundHeight = 1.3;
  playerObject.animations.push(idle);
  playerObject.animations.push(run);
  playerObject.animations.push(slash);
  playerObject.loadPropFromAjax("sword", "hand_r");


  var ground = scene.createObject();
  ground.y = -2.0;
  ground.width = 40.0;
  ground.depth = 48.0;
  ground.setTexture("assets/grass.png");


  runningLoop = setInterval(gameLoop, 1000 / 60);

  $("#status").removeClass("hidden").show();
  renderer.render();

  return true;

});
