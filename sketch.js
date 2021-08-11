
var bg, backgroundImg, ironman,ground,brickGroup, brickImage,diamondImage,diamondGroup;
var score=0;
var spikeImage,spikeGroup;
var gameState ="PLAY";

function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironmanImg= loadImage("images/iron.png");
  brickImage=loadImage("images/stone.png");
  diamondImage=loadImage("images/diamond.png");
  spikeImage=loadImage("images/spikes.png")
  restartImage=loadImage("images/restart.png");
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale =2;

  ground = createSprite(200,585,1700,10);
  ground.visible=false;

  ironman= createSprite(200,505,20,50);
  ironman.addImage(ironmanImg);
  ironman.scale=0.3;
  ironman.setCollider("rectangle",100,0,200,400)

  brickGroup= new Group();
  diamondGroup =new Group();
  spikeGroup= new Group();
restart= createSprite(500,300);
restart.addImage(restartImage);
restart.visible=false;
}

function draw() {
  if (gameState ==="PLAY"){
    
    ironman.setCollider("rectangle",0,0,200,500);
  bg.velocityY = 4;

    if (bg.y > 500){
      bg.y=bg.width/4;
    }
  if (keyDown("up")){
    ironman.velocityY=-10;
  }
  if (keyDown("left")){
    ironman.x-=5;  
  }
  
  if (keyDown("right")){
    ironman.x+=5;  
  }
   ironman.velocityY=ironman.velocityY+0.5;


generateBricks()
for (var i =0; i< (brickGroup).length; i++){
     var temp =brickGroup.get (i);

 if (temp.isTouching(ironman))
     ironman.collide(temp);
}

generateDiamonds()
for (var i =0;i<(diamondGroup).length; i++){
     var temp =diamondGroup.get(i);

  if(temp.isTouching(ironman)){
     score++;
     temp.destroy();
     temp=null;
  }
}
generateSpikes()
for(var i =0;i<(spikeGroup).length;i++){
     var temp=spikeGroup. get (i);
     
  if(temp.isTouching(ironman)){
    score=score-5;
    temp.destroy();
    temp=null;
  }
}
   if(score<=-10 || ironman.y>610){
  gameState ="END"; 
}
  }

if(gameState ==="END"){
  bg.velocityY=0;
  ironman.velocityY=0;
  diamondGroup.setVelocityYEach(0);
  spikeGroup.setVelocityYEach(0);
  brickGroup.setVelocityYEach(0);
  diamondGroup.setLifetimeEach(-1);
  spikeGroup.setLifetimeEach(-1);
  brickGroup.setLifetimeEach(-1);

  restart.visible=true;
  if(mousePressedOver(restart)){
    restartGame();
  }
}
ironman.collide(ground); 
    drawSprites();
    textSize(20);
  fill("brown")
  text("Diamonds Collected: "+ score, 500,50);
}

function generateDiamonds(){
  if (frameCount % 50===0){
   var diamond= createSprite(random(0,500),random(80,350),40,10);
    diamond.addImage(diamondImage);
    diamond.velocityY= 3;
    diamond.scale=0.5;

    diamond.lifetime=1000;
    diamondGroup.add(diamond);
  }
}
function generateBricks(){
  if (frameCount % 50===0){
   var brick =createSprite(1200,120,40,10);
    brick.x= random(50,450);
    brick.addImage(brickImage);
    brick.scale=0.5;
    brick.velocityY= 5;
      
    brick.lifetime =1000;
    brickGroup.add(brick);
  }
}
function generateSpikes() {
  if (frameCount % 150 === 0) {
    var spikes = createSprite(1200, 90, 10, 40);
    spikes.addAnimation("spike", spikeImage);
    spikes.x = random(50, 850);
    spikes.scale = 0.5;
    spikes.velocityY = 3;
    spikes.lifetime = 600;
    spikesGroup.add(spikes);
  }
}
function restartGame(){
  gameState="PLAY";
  brickGroup.destroyEach();
  diamondGroup.destroyEach();

  ironman.y=50;
  restart.visible=false;
  
}