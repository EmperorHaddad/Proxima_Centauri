/*
V1.1 - making a canvas, linked to JS, and add a background. Theres disavled code for key presses as I thought

tutorials learnt:
- getting started with the first basic syntax of JS - https://www.youtube.com/watch?v=UUFPEgRKwf4 - "Create Your First 
JavaScript Game - Introduction to JavaScript Game Development"
- why image/drawing won't appear on canvas - https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas  
- specific sysntaxes - https://www.w3schools.com/js/default.asp 

Tools used: 
- code editor - https://code.visualstudio.com/ - Microsift Visual Studio Code 
- Visual Studio Code extention: 'Live server' - https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer
- lightweight pixel art maker - https://www.piskelapp.com/ - Piskel
- more advanced pixel art maker - https://www.aseprite.org/ - Aseprite

V1.2 - attempted to load images on the canvas but images seem to only load after all other JS code has finish executeing so I
need to learn a different way of loading images for the game. (just using .drawImage doesnt seem to work, see the link for
"why image/drawing won't appear on canvas")

V2.1 - looked at dozens of tutorials, most uses only '.drawImage' which, previously said, doesn't work. I tried again many 
times, no luck.

tutorials learnt:
https://codeincomplete.com/articles/javascript-game-foundations-loading-assets

V3.1 - after cutting and simplifying a sourced code till it was only the necceary part to sucessfully display an image onto a
canvas (editedReferance - edited - V3), I attempted to integrate/referance some of its JS code into here. IT WORKS!!!

tutorials learnt:
https://www.w3schools.com/graphics/game_images.asp

V3.2 - doesn't appear to spport multiple images
- decided to re-implement the '.this' as a last effort.
- appears to work now. yay! 
- addad a function 'tileXYToCanvasXY' that translate the unit/grid matrix XY coords to pixel coords of the canvas.
- to allow much more easier and more dynamic when displaying troops, I added lists for each player/side. 
- proceeded to add the units in their starting positions for the demo game.

V3.3 - deleted the disabled 'placeUnits' and 'intitialiseUnitVars' sub-routines (may create a better version of it later).
- placed all reoutines before the bodycode (make it neater).
- implement the execute-once code of displaying the units in the 'initialiseUnits' sub-routine.
- adds understandable short description of each routine/class.
- removed the canvas's boarder in levelDemo.css file at its JS coords seems tp takes it into account as part of the canvas 
itself. (later I realised that it was not the case)
- canvas's coord seems to still start from (8,79)
- modified code to take the starting coords, of the canvas, into account
- FINALLY FIGURED OUT HOW TO GET VS CODE DEBUGGING TOOL WORKING
referanced link:
https://stackoverflow.com/questions/52682446/visual-studio-code-debugger-with-chrome-refused-to-connect-to-localhost
(the top answer regarding the "live server")
- a listening routine of selecting tiles by clicking on the canvas has been sucessfully implemented without the need of adding
many invisible button entities. However making the event listener and the triggered sub-routine saperate was not as successful. 
Refereanced code: https://www.geeksforgeeks.org/how-to-get-the-coordinates-of-a-mouse-click-on-a-canvas-element/

V3.4 - added a sub-routine that uterlises the click event listener to select a starting and ending position, which resets if
a tile is selected again, where its status will be displayed to the user. E.G.: displaying "Action Status: move [1,1] to [4,2]"
when user clicks on the unit at [1,1] and then the empty tile at [4,2]. the sub-routine is called 'selectUnit'
- added 'this.placement' to the class insertImage to allow easier retrival of image's placement on the grid of the canvas and
allow it to be mutable (to let changing the placement of units possible in a easier way).
- added a sub-routine, called 'moveUnit', that moves the Red unit both on the canvas and in the 'unitMatrix'. Obviously linked
to the 'selectUnit'.
- fixed errors such as fixing unit duplicating (when moved) by refreshing the entire canvas per movement. Suprisingly it didn't
cause any negative visual effects. 

*/

/*____________________________________________________________________________________________________________________________*/

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

function insertImage(source, x, y,width,height){/// create and update images in the canvas
    this.image = new Image();
    this.image.src = source;
    this.placement = [x,y];
    console.log(this.image);
    this.update = function() {
        ctx = canvas.context;
        ctx.drawImage(this.image,this.placement[0],this.placement[1],width,height);
    }

}

function tileXYToCanvasXY(tileXY){/// convert the axis, for the game tiles, into the pixel axis for the canvas
    let canvasXY = [,];
    canvasXY[0] = tileXY[0]*64
    canvasXY[1] = tileXY[1]*48
    if ((tileXY[1]%2)==1){ canvasXY[0] += 32;}
    //console.log(tileXY)
    //console.log(canvasXY)
    return canvasXY
}
function updateGameArea() {/// calls the 'update' method for each image.
    clearGameArea();
    background.update();
    
    for (let i =0;i<unitRed.length;i++) {
        //console.log(i);
        //console.log(unitRed[i]);
        unitRed[i].update();
    }
    for (let i =0;i<unitBlu.length;i++) {
        //console.log(i);
        //console.log(unitRed[i]);
        unitBlu[i].update();
    }
}
function clearGameArea(){ /// clears the canvas
    /// replace everything in the gameArea canvas with a green colour:
    var ctx = canvas.context;
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    //console.log(unitRed);
}

function addUnit(source,tileX,tileY,isRed){ /// creates a specific unit image (Red or Blu), at a specific place on the canvas  
    canvasXY = tileXYToCanvasXY([tileX,tileY]);
    unit = new insertImage(source,canvasXY[0],canvasXY[1],64,64);
    if (isRed){
        unitRed[unitRedCounter]= unit
        unitRedCounter += 1;
    }
    else{
        unitBlu[unitBluCounter]= unit
        unitBluCounter += 1;
    }
}

function initialiseUnits(){/// calls the 'addUnit' sub-routine many times to display all units' at initial position.
    /// declear the grid as the background image
    background = new insertImage("resources/grid.png",0,0,544,400);

    /// add the Red units to the grid:
    addUnit("resources/units/playerRed/Tanker.png",0,0,true);
    addUnit("resources/units/playerRed/Ninjer.png",0,1,true);
    addUnit("resources/units/playerRed/Sniper.png",0,2,true);
    addUnit("resources/units/playerRed/Healer.png",0,3,true);
    addUnit("resources/units/playerRed/Commander.png",0,4,true);
    addUnit("resources/units/playerRed/Sniper.png",0,5,true);
    addUnit("resources/units/playerRed/Ninjer.png",0,6,true);
    addUnit("resources/units/playerRed/Tanker.png",0,7,true);
    for (let i = 0; i<8;i++){
        //canvasXY = tileXYToCanvasXY([1,i])
        //unit = new insertImage("resources/units/playerRed/Trooper.png",canvasXY[0],canvasXY[1],64,64);
        addUnit("resources/units/playerRed/Trooper.png",1,i,false);
        unitRed[unitRedCounter+i]= unit
    }
    unitRedCounter += 8;
    console.log(unitRed);
    
    /// add the Blu units to the grid:
    addUnit("resources/units/playerBlu/Tanker.png",7,0,false);
    addUnit("resources/units/playerBlu/Ninjer.png",7,1,false);
    addUnit("resources/units/playerBlu/Sniper.png",7,2,false);
    addUnit("resources/units/playerBlu/Healer.png",7,4,false);
    addUnit("resources/units/playerBlu/Commander.png",7,3,false);
    addUnit("resources/units/playerBlu/Sniper.png",7,5,false);
    addUnit("resources/units/playerBlu/Ninjer.png",7,6,false);
    addUnit("resources/units/playerBlu/Tanker.png",7,7,false);
    for (let i = 0; i<8;i++){
        //canvasXY = tileXYToCanvasXY([6,i])
        //unit = new insertImage("resources/units/playerBlu/Trooper.png",canvasXY[0],canvasXY[1],64,64);
        addUnit("resources/units/playerBlu/Trooper.png",6,i,64,64,true);
        unitBlu[unitBluCounter+i]= unit
    }
    unitBluCounter += 8;
    console.log(unitRed);
}

function selectUnit(tilesXY){
    occupation = unitMatrix[tilesXY[1]][tilesXY[0]]
    if (action[0] == "N"||action[1]!="N"){ /// is this starting position?
        if (occupation !="N"){ /// is starting position occupied?
            if (occupation>0){ /// is occupying unit Red?
                action[0] = tilesXY; /// starting position is the selected coords
                action[1] = "N"; /// ending position is resetted
                labelActionStatus.textContent = "Action Status: move ["+action[0]+"]"; /// display current action to user
            }
        }
    }
    else{ /// when this is end position instead 
        if (occupation =="N"){/// is end position unoccupied?
            action[1] = tilesXY; /// ending position is the selected coords
            labelActionStatus.textContent += " to ["+action[1]+"]"; /// display current action to user
        moveUnit();
        } 
    }
}

function decideCommand(){
    moveUnit();
}

function moveUnit(){
    function editMatrixByMovement(){
        unitMatrix[action[1][1]][action[1][0]] = unitMatrix[action[0][1]][action[0][0]];
        unitMatrix[action[0][1]][action[0][0]] = "N";
        console.log(unitMatrix);
    }
    let isRed;
    if (unitMatrix[action[0][1]][action[0][0]]>0){isRed= true;}
    else{isRed = false;}
    console.log("stage 0");
    if (isRed == true){
        console.log("stage 1");
        for (let i =0;i<unitRed.length;i++){
            /*
            console.log("stage 2");
            console.log("check "+i);
            console.log(unitRed[i].placement);
            console.log(tileXYToCanvasXY(action[0]));

            console.log(unitRed[i].placement[0] == tileXYToCanvasXY(action[0])[0]);
            console.log(unitRed[i].placement[1] == tileXYToCanvasXY(action[0])[1]);
            console.log((unitRed[i].placement[0] == tileXYToCanvasXY(action[0])[0])&&(unitRed[i].placement[1] == tileXYToCanvasXY(action[0])[1]))

            console.log(action[0][0]);
            console.log(action[0][1]);
            
            console.log("stage 2.5");

            console.log(unitRed[i].placement[0]+" - "+tileXYToCanvasXY(action[0])[0]);
            console.log(unitRed[i].placement[1]+" - "+tileXYToCanvasXY(action[0])[1]);
            */
            //if (unitRed[i].placement == tileXYToCanvasXY(action[0])){
            if ((unitRed[i].placement[0] == tileXYToCanvasXY(action[0])[0])&&(unitRed[i].placement[1] == tileXYToCanvasXY(action[0])[1])){
                console.log("stage 3");
                console.log("changed placement of "+i);

                unitRed[i].placement = tileXYToCanvasXY(action[1]);
                
                break;
            }
        }
    }
    editMatrixByMovement();
}

console.log("game started");

//function initialiseCanvas(){
    ///set up to uterlise the canvas as the game area:
    var canvas = document.getElementById("gameArea");
    //var ctx = canvas.getContext("2d");
    canvas.context = canvas.getContext("2d");
    canvas.interval = setInterval(updateGameArea, 20);
//}

var labelActionStatus = document.getElementById("labelActionStatus");

var unitMatrix = [ // mapping of the units on the grid:
    [5,6,"N","N","N","N",-6,-5],
    [4,6,"N","N","N","N",-6,-4],
    [3,6,"N","N","N","N",-6,-3],
    [2,6,"N","N","N","N",-6,-1],
    [1,6,"N","N","N","N",-6,-2],
    [3,6,"N","N","N","N",-6,-3],
    [4,6,"N","N","N","N",-6,-4],
    [5,6,"N","N","N","N",-6,-5]
];

var unitBluCounter = 0;
var unitBlu = new Array();
var unitRedCounter = 0;
var unitRed = new Array();
var canvasXY;

/// coords of unit, destination,
var action = ["N","N"];

clearGameArea(); 
initialiseUnits();

/// can't seem to execute this in any routine ._. :
var canvasEdgeVar = canvas.getBoundingClientRect(); 
var canvasEdges = [Math.round(parseFloat(canvasEdgeVar.left.toString())),Math.round(parseFloat(canvasEdgeVar.top.toString()))];
console.log("canvas coords on page:"+canvasEdges[0],canvasEdges[1]);

//canvas.addEventListener('click', clickToTileXY(event)) 
canvas.addEventListener('click', function(event) {/// takes coord of clicks on canvas to find the tiles it is clicking on.
    
    /*Knowing that a game tile is a 64x64 pixel png, its clickable area is a 64x48 pixel area in the middle of the png. This is
    the best balance between user clicking them without much thought/concideration and the tiles' clickable areas being
    adjacent to each other but not overlapping.*/
    
    //console.log(event.clientX,event.clientY);
    //console.log(canvasEdges[0],canvasEdges[1]);
    let canvasPixelX = event.clientX-canvasEdges[0];
    let canvasPixelY = event.clientY-canvasEdges[1];
    tilesXY = [,];
    console.log(canvasPixelX,canvasPixelY);

    if (canvasPixelY>=8 && canvasPixelY<=368){ /// is Y canvas coord valid?
        console.log("y is valid")

        tilesXY[1] = Math.floor((canvasPixelY-8)/48);
        if (tilesXY[1]%2==1){ /// is the row number of tiles even (top row is 0, bottom row is 7)
            console.log("x (odd) is valid")
            if (canvasPixelX>=32){/// is X canvas coord valid in the odd number row?
                tilesXY[0] = Math.floor((canvasPixelX-32)/64);  
                console.log(tilesXY[0],tilesXY[1]); 

                selectUnit(tilesXY);
                //action[0] = tilesXY;
                //return tilesXY;
            }
        }

        else{
            console.log("x (even) is valid")
            if (canvasPixelX<=512){/// is X canvas coord valid in the even number row?
                tilesXY[0] = Math.floor((canvasPixelX)/64); 
                console.log(tilesXY[0],tilesXY[1]);   
                
                selectUnit(tilesXY);
                //action[0] = tilesXY;
                //return tilesXY;
            }
        }

    }
    console.log("click")
    //return -1
    
})