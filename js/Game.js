class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    cars = [car1];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var x;
      var y = 0;
      for(var plr in allPlayers){
        index = index+1;
        x = x+200;
        x = displayHeight-allPlayers[plr].distance;
        
        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x+200;
        }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=50;
      player.update();
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();

    }

    if(keyIsUp(LEFT_ARROW) && player.index !== null){
      player.distance+=10;
      player.update+=10;
    }

    drawSprites();
  }
}
