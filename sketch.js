//Create variables here
var dog, happyDog, database, foodS, foodStock

function preload()
{
  //load images here
  saddog=loadImage("images/dogImg.png");
  happydog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database()
	createCanvas(500, 500);
  dog=createSprite(250,200)
  dog.scale=0.15;
  dog.addImage(saddog)
  //fetch foodstock
  foodStock=database.ref('Food')
  foodStock.on("value", readStock)
}


function draw() {  
background(46,136,87)
//up arrow to feed the dog
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydog);
}
  drawSprites();
  //add styles here
  fill('white')
  text("Food Remaining: "+foodS, 150, 100)
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
if (x<=0){
  x=0;
}else{
  x=x-1;
}


database.ref('/').update({
  Food:x
})
}