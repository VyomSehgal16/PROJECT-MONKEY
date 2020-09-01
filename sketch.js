var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,ground,obstacleGroup,bananaGroup,banana;
var obstacle,score,monkeyImage,stone,bananaImage;
var Background1,backImage;
var score; 
function preload(){
  monkeyImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  backImage = loadImage("jungle.jpg");
  stone = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(50,350,10,10);
  monkey.addImage("monkey1",monkeyImage);
  monkey.scale = 0.1;
  
  ground = createSprite(200,380,400,20);
  ground.visible = false;
  
  Background1 = createSprite(200,200,400,400);
  Background1.addImage("backGROUND",backImage);
}

function draw() {
  background(255);
   monkey.velocityY = monkey.velocityY + 0.65; 
  
  if(gameState === PLAY){
    ground.velocityX = -5;
    
    textSize(25);
    score = 0;
    text("score:"+ score, 150, 100);
    
    if(keyDown("space") && monkey.y >= 349 ){
      monkey.velocityY = -11;
    }
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    spawnObstacles();
    spawnFood();
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score +1;
    }

    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  
  if(gameState === END){
    textSize(60);
    text("GAME OVER",25,200);
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    Background.destroy();
    ground.destroy();
    monkey.destroy();
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
  }
  monkey.collide(ground);
  drawSprites();
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -5;
    obstacle.addImage("STONE",stone);
    obstacle.scale = 0.1;
    obstacle.lifetime = 90;
    obstacleGroup.add(obstacle);
  }
}
function spawnFood(){
  if(frameCount % 80 === 0){
    banana = createSprite(400,160,10,10);
    banana.velocityX = -5.5;
    banana.y = randomNumber(250,300);
    banana.addImage("BANANA",bananaImage);
    banana.scale = 0.07;
    banana.lifetime = 90;
    bananaGroup.add(banana);
  }
}
