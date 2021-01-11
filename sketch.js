var PLAY=1;
var END=0;
var gameState=1;
var sword,fruit,monster,fruitGroup,enemyGroup, score,r,randomFruit,background1;
var sliceSound;
var bombSound;
var bSound;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage,background1Image;


function preload(){
  
  swordImage = loadImage("talwar.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  background1Image = loadImage("Screenshot (341).png");
  sliceSound = loadSound("sliceSound.mp3");
  bombSound = loadSound("bombSound.mp3");
  bSound = loadSound("Sound.mp3");
  
}  

function setup() {
  createCanvas(600, 600);
  
  bSound.play();
  background1 = createSprite(300,300,600,600);
  background1.addImage(background1Image);
  background1.scale = 4;
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.3;
  
  sword.setCollider("rectangle",0,0,40,40);

  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    fruits();
    Enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+5;
      sliceSound.play();
    }
    else
    {
    if(enemyGroup.isTouching(sword)){
      gameState=END;
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);
      bombSound.play();
      background1.addImage(gameOverImage);
      background1.scale = 2;
      
      }
    }
  }
  
  drawSprites();
  fill("red");
  textFont("comic sans ms");
  textSize(25);
  text("Score : "+ score,250,60);
  fill("red");
  textFont("comic sans ms");
  textSize(25);
  text("Cut The Fruit, Avoiding Microbes Entry!!",0,30);
  
}


function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(600,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.scale=1;
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(600,200,20,20);
    fruit.scale=0.3;
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}