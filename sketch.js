//Create variables here
var dog, happyDog, database, foodS;
var dogIMG1, dogIMG2;
var addFoods,feedDog;
var food, feed, addFood;

var fedTime;
var foodObj;

function preload()
{
  //load images here
  dogIMG1 = loadImage("images/dogImg.png");
  dogIMG2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);

  dog = createSprite(250, 350, 170, 170);
  dog.addImage(dogIMG1);
  dog.scale = 0.25;

  foodObj = new Food();

  foodStock = database.ref("Food");
  //foodStock.on("value",)

  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFoods=createButton("Add Food");
  addFoods.position(800,95);
  addFoods.mousePressed(addFoods);

}


function draw() {  
  background(46, 139, 87);

  

  foodObj.display();

  

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed=data.val();
  })
  
  drawSprites();
  textSize(20);
  fill("white");

}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog() {
  dog.addImage(dogIMG2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}



