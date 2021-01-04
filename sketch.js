//Create variables here
var dog;
var dogImage;
var happyDog;
var database;
var foodS,foodStock;
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImage=loadImage("images/Dog.png");
  happyDog=loadImage("images/happydog.png");
}

function setup() {
  createCanvas(1000,500);

  database = firebase.database();

  foodStock=database.ref('foodStock');
  foodStock.on("value",readStock);

  foodObj=new Food();

  dog=createSprite(800,250,1,1);
  dog.addImage(dogImage);
  dog.scale=0.15;

  feed=createButton("Feed the dog");
  feed.position(500,15);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(600,15);
  addFood.mousePressed(addFoods);

}


function draw() {
  background(46,139,87);
  foodObj.display();
  
  
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }*/

  //add styles here
  //fill("white");
  //stroke("white");
  //strokeWeight(1);
  //textSize(12);
  //text("Note : Press UP_ARROW Key To Feed Drago Milk!",125,30);
  //textSize(15);
  //text("Food remaining : "+foodS,190,190);


  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  drawSprites();
}
  
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

/*function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
    foodStock:x
  })
}*/

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}