/*
tutorials learnt:
getting started with the first basic syntax of JS - https://www.youtube.com/watch?v=UUFPEgRKwf4 - "Create Your First JavaScript Game - Introduction to JavaScript Game Development"

*/
console.log("game started");

/*
/// detecting key presses (and unpress):
document.body.addEventListener("keydown",keyDown);
document.body.addEventListener("keyup",keyDown);
function keyDown(event){
    if (event.keyCode == 80){
        keyPressPLow = true;
    }
}
function keyDown(event){
    if (event.keyCode == 80){
        keyPressPLow = false;
    }
}
*/

///set up to uterlise the canvas as the game area:
const canvas = document.getElementById("gameArea");
const ctx = canvas.getContext("2d");

/// declear the grid as the background image:
const background = new Image();
background.src = "grid.png";

function refreshGameArea(){
    clearGameArea(); 
}

/// replace everything in the gameArea canvas with a green colour:
function clearGameArea(){
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    //ctx.drawImage(background,0,0,canvas.width,canvas.height);
    ///neccesity of the '.onload' property to load the image (seems to be vital only to some computers, including mine): https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas 
    background.onload = function(){
        ctx.drawImage(background,0,0,canvas.width,canvas.height);
      }
}

refreshGameArea();
