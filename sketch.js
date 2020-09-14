var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey,monkey_running;
var bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score,lives;
var ground;
var gameover;
var gameoverImage;
var restart;
var restartImage;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameoverImage=loadImage("gameover.jpg");
  restartImage=loadImage("restart.png");
}



function setup() {
  createCanvas(600,400);

  ground = createSprite(400,380,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.shapeColor="black";
  //console.log(ground.x)

  
  monkey=createSprite(50,360,50,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  gameover=createSprite(275,200);
  gameover.addImage(gameoverImage);
  gameover.visible=false;
  gameover.scale=0.15;
  
  restart=createSprite(275,300);
  restart.addImage(restartImage);
  restart.visible=false;
  restart.scale=1;
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  score=0;
  lives=5;
}


function draw() {
background("green");
fill("black");
textSize(18);
text("Score: "+score,480,20); 
text("Lives:"+lives,480,50);
if(gameState===PLAY){
if(ground.x<0){
  ground.x=ground.width/2;
}

if(keyDown("space")&& monkey.y>=340){
  monkey.velocityY=-12;
}  

monkey.velocityY = monkey.velocityY + 0.8
monkey.collide(ground);
 
  
if(FoodGroup.isTouching(monkey)){
FoodGroup.destroyEach();
score=score+1;
   }
  
if(obstacleGroup.isTouching(monkey)){
lives=lives-1;
obstacleGroup.destroyEach();
  

   }
  
if(lives===0){
gameState=END;
   }
food();
Obstacle();
}

if(gameState===END){
ground.velocityX=0;
obstacleGroup.velocityX=0;
FoodGroup.velocityX=0;
monkey.visible=false;
restart.visible=true;
gameover.visible=true;
if(mousePressedOver(restart)){
reset();
   }
   }

 drawSprites(); 

}

function food(){
if(World.frameCount%80===0){
  var banana=createSprite(600,360,20,20);
  banana.addImage(bananaImage);
  banana.y=Math.round(random(225,275));
  
  banana.velocityX=-8;
  banana.scale=0.1;
  banana.Setlifetime=50;
  
  FoodGroup.add(banana);
}
}

function Obstacle(){
if(World.frameCount%200===0){
var rock=createSprite(600,360,20,20);
 rock.addImage(obstacleImage); 
 //rock.y=Math.round(random(300,370));
 rock.velocityX=-8;
  rock.scale=0.1;
 rock.Setlifetime=50;
  obstacleGroup.add(rock);
}
}

function reset(){
gameState=PLAY;
restart.visible=false;
gameover.visible=false;
FoodGroup.destroyEach();
obstacleGroup.destroyEach();
ground.velocityX=-4;
monkey.x=50;
monkey.y=360;
monkey.visible=true;
score=0;
lives=5;
}

