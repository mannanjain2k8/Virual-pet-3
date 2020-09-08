//Create variables here
var dog,foodStock,foodObj,database,dogIMG,feed;
var happyDogIMG,feedTime,lastFed;
var BedRoom,garden,washRoom
var Playing,Sleeping,Bathing,Hungry;
var currentTime;
var gameState;

function preload()
{
  //load images here
  dogIMG = loadImage("images/Dog.png");
  BedRoom = loadImage("images/BedRoom.png");
  garden = loadImage("images/Garden.png");
  washRoom = loadImage("images/WashRoom.png")
  happyDogIMG = loadImage("images/happy Dog.png");
}

function setup() {
  createCanvas(800, 500)


  feed = createButton("Feed The Dog");
  feed.position(750,70);
  feed.mousePressed(feedDog)
 
  add= createButton(" Add Food Stock")
  add.position(860,70);
  add.mousePressed(addFood)
 
 
    dog = createSprite(650,250,20,20)
    dog.addImage(dogIMG);
   dogIMG.resize(185,198);
  
  database = firebase.database();
  foodStock = database.ref('Food');
  foodObj = new Food()
 
  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
       lastFed = data.val();

      
  })
}



function draw() {  
  background(46,139,87);

 

  fill("black")
  textSize(15);

  if(gameState!== "Hungry"){
    feed.hide();
    add.hide(); 
    dog.visible = false;
  }
  else {
    feed.show();
    add.show();
    dog.visible = true
    
    
    
  }

   currentTime = hour();
   
    if(currentTime <= (lastFed + 1)){
      foodObj.Garden();
      update("Playing")
    }
    else if(currentTime  === (lastFed + 2)){
       foodObj.bedRoom();
       update("Sleeping")
    }
    else if(currentTime >(lastFed + 3) && currentTime <= (lastFed + 4)){
      foodObj.WashRoom();
      update("Bathing")
    } 
    else{
      foodObj.display();
      update("Hungry")
      
    }
   
   
   readState = database.ref('gameState');
   readState.on("value",function(data){
       gameState= data.val();
   })


  if(lastFed !== undefined){
  if(lastFed >= 12){
    text("Last Fed:" + lastFed% 12 + " PM ",290,35)
  }

  else if (lastFed === 0){
    text("Last Fed:" + " 12 AM",290,35)
  }

  else {
    text("Last Fed:" + lastFed + " AM ",290,35)
  }
  }

 

  
 

drawSprites();

}
 


function readStock(data){
   foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
      x = x - 1
  }

  Food:foodS
   database.ref('/').update({

     

   })
   
   
}

function feedDog(){
  dog.addImage(happyDogIMG);
  dog.scale = 0.2;
  
  if(dog.x >= 540){
    dog.x = dog.x - 200
    
  }
  foodObj.updatefoodStock(foodObj.getfoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getfoodStock(),
    feedTime:hour()
  })
 
}

function addFood(){
  
  foodObj.updatefoodStock(foodObj.getfoodStock()+1);
  database.ref('/').update({
    Food:foodObj.getfoodStock(),
    
  
  })


}
  
  
function update(state){

  database.ref('/').update({
    gameState:state
  });


}


