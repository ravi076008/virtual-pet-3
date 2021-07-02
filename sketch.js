//Create variables here
var dog,dogImage1,dogImage2,database,foodStock,foodS;
var feed,addFood,foodObj,FeedTime;
var fedTime,lastFed,readState,garden1,washroom1,bedroom1,sadDog;
var gameState;
function preload()
{
  garden1=loadImage("images/garden.png")
  washroom1=loadImage("images/washroom.png")
  bedroom1=loadImage("images/bedRoom.png")
  
  sadDog=loadImage("images/deadDog.png")


  dogImage1=loadImage("images/dogImg.png");
  dogImage2=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
 database=firebase.database()
 dog=createSprite(250,300,150,150);
 dog.scale=0.15
 dog.addImage(dogImage1)

 foodstock=database.ref('food')
foodstock.on("value",readStock)
textSize(20)
foodObj=new Food();
 feed=createButton('feed the dog')
 feed.position(700,95)
 feed.mousePressed(feedDog)

 addFood=createButton('add the food')
 addFood.position(800,95)
 addFood.mousePressed(addFoods)
 
 
 
  
 var address2=database.ref('GameState')
 address2.on("value",function(data){
 gameState=data.val();
 console.log(gameState);

 })
}


function draw() {  
background(0)


var address3=database.ref('FeedTime'); 
address3.on("value",function(data){ lastFed=data.val(); })

fill(255,255,254); textSize(15);
 if(lastFed>=12){ 
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }
   else if(lastFed==0){ 
     text("Last Feed : 12 AM",350,30);
     }
   else{ 
     text("Last Feed : "+ lastFed + " AM", 350,30);
 }

  drawSprites();
  fill(255,255,254);
   stroke("yellow"); 
  text("Food remaining : "+foodS,170,200); 
   
  if(gameState!="hungry"){
   feed.hide();
   addFood.hide();
   dog.remove();
  }
  else{
   feed.show();
   addFood.show();
   dog.addImage(sadDog);



  }
  var currentTime=hour();
  console.log(currentTime);
  if(currentTime==(lastFed+1)){
  update("playing")
  garden();
  } 
  else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)) {
    update("bathing")
  washroom();
}
else if(currentTime==(lastFed+2)){
  update("sleeping")
  bedroom();
  } 
}


function readStock(data){
foodS=data.val()
console.log(foodS);



}



  function feedDog(){
     dog.addImage(dogImage2);
     foodS=foodS-1;
  var address=database.ref('/')
  address.update({food:foodS,FeedTime:hour()})
  }

   function addFoods(){ 
    foodS++;
     database.ref('/').update({ food:foodS })
     }

     function garden(){
      
      background(garden1)
    
    
     }

     function washroom(){
      
       background(washroom1)
     
     
      }

      function bedroom(){
       
       background(bedroom1)
     
     
      }

      function update(state){
       var address4=database.ref('/')
       address4.update({GameState:state});

      }

      




    
