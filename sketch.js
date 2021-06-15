//mouse running away from cat collects cheese
var cat, catImg, cheese, cheeseImg, trap, trapImg, ground;
var bg, bgImg;
var mouse, mouse_runs;
var gameState = "PLAY";
var score = 0;
var CatGroup, TrapGroup, FoodGroup;  

function preload(){
  catImg = loadImage("cat.png");
  cheeseImg = loadImage("cheese.png");
  trapImg = loadImage("trap.png");
  bgImg = loadImage("bg.jpg");
  mouse_runs = loadAnimation("m1.png","m2.png","m3.png","m4.png","m5.png","m6.png","m7.png","m8.png","m9.png","m10.png","m11.png","m12.png");
}

function setup() {
  createCanvas(800,400);
  
  bg = createSprite(0,0,800,400);
  bg.scale = 2.30;
  bg.addImage(bgImg);
  bg.x=bg.width/2;
  bg.velocityX=-4;

  mouse = createSprite(100,340,20,50);
  mouse.addAnimation("Running",mouse_runs);
  mouse.scale = 0.7;
  
  ground = createSprite(400,405,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group();
  CatGroup = new Group();
  TrapGroup = new Group();
}

function draw() { 
  background(0);
  
  if(bg.x<100){
    bg.x=bg.width/2;
    }

    if(keyDown("space") ) {
      mouse.velocityY = -12;
    } 
      
    mouse.velocityY = mouse.velocityY + 0.8;
    mouse.collide(ground);
    spawnCheese();
    spawnCat();
    spawnTrap();   
if (gameState === "PLAY"){

if (FoodGroup.isTouching(mouse)){
  FoodGroup[0].destroy(); 
  score = score + 2;
}  
    if (CatGroup.isTouching(mouse)){
      gameState = "END";
    }

    if (TrapGroup.isTouching(mouse)){
      gameState = "END";
    }

    textSize(30);
    fill("blue");
    text("Score:", score, 30, 220);
    
  }else if(gameState === "END"){
    bg.velocityX = 0;
    mouse.visible = false;
    bg.visible =false;

    CatGroup.destroyEach();
    TrapGroup.destroyEach();
    FoodGroup.destroyEach();

    textSize(30);
    fill("white");
    text("Game Over!", 300, 220);
  }

drawSprites();
}

function spawnCheese(){
  if (frameCount % 80 === 0){
    var cheese = createSprite(600,250,40,10);
    cheese.y = random(120,200);
    cheese.addImage(cheeseImg);
    cheese.scale = 0.1;
    cheese.velocityX = -4;

    cheese.lifetime = 300;
    mouse.depth = cheese.depth + 1;
 FoodGroup.add(cheese);
  }
}

function spawnCat(){
  if (frameCount % 100 === 0){
    var cat = createSprite(400,350,20,50);
 cat.addImage(catImg);
 cat.velocityX = -4;
 cat.lifetime = 300;
 mouse.depth = cat.depth + 1;
 cat.scale = 0.4; 
    CatGroup.add(cat);
  }
}
  
function spawnTrap(){
  if (frameCount % 300 === 0){
    var trap = createSprite(400,380,20,50);
 trap.addImage(trapImg);
 trap.scale = 0.1; 
 trap.velocityX = -4;
 trap.lifetime = 300;
 mouse.depth = trap.depth + 1;
    TrapGroup.add(trap);
  }
}