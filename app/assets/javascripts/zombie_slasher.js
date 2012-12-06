var testScene;
var playerObject;
var attack  = false;
var score = 0;
var runningLoop;
var renderer;
var zombies = [];
var timer = 0;
var swordCollide = {x: 0, y: 0, z: 1.5, boundHeight: 1.0, boundWidth: 2.0, boundDepth: 2.0};

function reset() {
  score = 0;
  $(".score").html(score);
  zombies = [];
  attack = false;
  playerObject.z = 0;
  playerObject.x = 0;
  testScene.objects = [testScene.objects[0], testScene.objects[1]];
}

var generateZombie = function() {
  if(zombies.length < 30) {
    var zombie = testScene.createAvatar($('#user_id').val());
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
          zombie.z = Math.random()*14 - 7;
        } else {
          zombie.x = Math.random()*30 - 15;
          if(Math.random() > 0.5) {
            zombie.z = 12;
          }else {
            zombie.z = -12;
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
        var chance = score / 10000;
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

  if(timer % 60 === 0) {
    for(var zombie in zombies) {
      zombie = zombies[zombie];
      if(zombie.dead) {
        if(Math.random() <= 0.1) {
          zombie.dead = false;
          zombie.changeAnimation(2);
          break;
        }
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
      if(!attack) {
        if (e.keyCode == 37) { //left
            playerObject.rotateY = 180;
            if(playerObject.z > -12) {
              playerObject.z-= 0.7;
            }
            swordCollide.x = playerObject.x;
            swordCollide.z = playerObject.z - 1.5;
        }
        if (e.keyCode == 39) { //right
            playerObject.rotateY = 0;
            if(playerObject.z < 12) {
              playerObject.z+= 0.7;
            }
            swordCollide.x = playerObject.x;
            swordCollide.z = playerObject.z + 1.5;
        }
        if (e.keyCode == 40) { //down
            playerObject.rotateY = -90;
            if(playerObject.x > -6) {
              playerObject.x-= 0.7;
            }
            swordCollide.x = playerObject.x - 1.5;
            swordCollide.z = playerObject.z;
        }
        if (e.keyCode == 38) { //up
            playerObject.rotateY = 90;
            if(playerObject.x < 7) {
              playerObject.x+= 0.7;
            }
            swordCollide.x = playerObject.x + 1.5;
            swordCollide.z = playerObject.z;
        }
        if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 38) { 
          if(playerObject.currentAnimation != 1) {
            playerObject.changeAnimation(1);
          }
        }

        if (e.keyCode == 32) { //space
            attack = true;
            playerObject.changeAnimation(2);
        }
      }
  });

  $(document).keyup(function(e){
    if(!attack) {
      if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 38) { 
        playerObject.changeAnimation(0);
      }
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
  var slash = new Animation(220, 245);
  slash.speed = 1.1;
  slash.loop = false;
  

  playerObject = testScene.createAvatar($('#user_id').val());
  playerObject.boundHeight = 1.3;
  playerObject.animations.push(idle);
  playerObject.animations.push(run);
  playerObject.animations.push(slash);
  playerObject.loadPropFromAjax("sword", "hand_r");


  var testObject3 = testScene.createObject();
  testObject3.y = -2.0;
  testObject3.width = 20.0;
  testObject3.depth = 40.0;
  testObject3.boundWidth = 20.0;
  testObject3.boundDepth = 40.0;
  testObject3.setTexture("assets/grass.png");


  runningLoop = setInterval(gameLoop, 1000 / 60);

  $("#status").removeClass("hidden").show();
  renderer.render();

  return true;

});
