/*
V1.1 - making a canvas, linked to JS, and add a background. Theres disavled code for key presses as I thought

tutorials learnt:
- getting started with the first basic syntax of JS - https://www.youtube.com/watch?v=UUFPEgRKwf4 - "Create Your First 
JavaScript Game - Introduction to JavaScript Game Development"
- why image/drawing won't appear on canvas - https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas  
- specific sysntaxes - https://www.w3schools.com/js/default.asp 

Tools used: 
- code editor - https://code.visualstudio.com/ - Microsift Visual studio 
- lightweight pixel art maker - https://www.piskelapp.com/ - Piskel
- more advanced pixel art maker - https://www.aseprite.org/ - Aseprite

V1.2 - attempted to load images on the canvas but images seem to only load after all other JS code has finish executeing so I
need to learn a different way of loading images for the game. (just using .drawImage doesnt seem to work, see the link for
"why image/drawing won't appear on canvas")

V2.1 - looked at dozens of tutorials, most uses only '.drawImage' which, previously said, doesn't work. I tried again many 
times, no luck.

tutorials learnt:
https://codeincomplete.com/articles/javascript-game-foundations-loading-assets

V3.1 - after cutting and simplifying sourced code till it was only the necceary part to sucessfully display an image onto a
canvas (editedReferance - edited - V3), I attempted to integrate/referance some of its JS code into here. IT WORKS!!!

tutorials learnt:
https://www.w3schools.com/graphics/game_images.asp

V3.2 - doesn't appear to spport multiple images
- decided to re-implement the '.this' as a last effort.
- appears to work now.
- addad a function 'tileXYToCanvasXY' that translate the unit/grid matrix XY coords to pixel coords of the canvas.
- to allow much more easier and more dynamic when displaying troops, I added lists for each player/side. 
- proceeded to add the units in their starting positions for the demo game.
*/

/*____________________________________________________________________________________________________________________________*/

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


//function initialiseCanvas(){
    ///set up to uterlise the canvas as the game area:
    var canvas = document.getElementById("gameArea");
    //var ctx = canvas.getContext("2d");
    canvas.context = canvas.getContext("2d");
    canvas.interval = setInterval(updateGameArea, 20);
//}

/// declear the grid as the background image:
//var background = new Image();
//background.src = "resources/grid.png"; 
//console.log(background);

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
/*
function intitialiseUnitVars(){ // setting up the image appearance to each corrosponding unit
    const UnitNameToNumAddSix = [  //the index of unit image corropsond, subtracted by 6, corrospond to the unit's ID in the 
        //'unitMatrix' (except 'unitMatrix' ID "E", which means its empty) - E.G.: the second item in array (index number is 1) 
        corrospond to the 'unitMatrix' ID of -5 
        ["resources/units/playerBlu/Commander.png","resources/units/playerBlu/Healer.png","resources/units/playerBlu/Ninjer.png","resources/units/playerBlu/Sniper.png","resources/units/playerBlu/Tanker.png","resources/units/playerBlu/Trooper.png"],
        ["resources/units/playerRed/Commander.png","resources/units/playerRed/Healer.png","resources/units/playerRed/Ninjer.png","resources/units/playerRed/Sniper.png","resources/units/playerRed/Tanker.png","resources/units/playerRed/Trooper.png"]
    ];
    
    function returnImage(fileLocation){
        let image = new Image();
        image = fileLocation;
        return image;
    }
    
    let UnitImageToNumAddSix = new Array()
    let subArray = new Array()
    for (let i = 0; i<UnitNameToNumAddSix.length; i++){
        subArray = new Array();
        for(let j = 0; j<UnitNameToNumAddSix[i].length; j++){
            subArray[j] = new Image();
            subArray[j].src = UnitNameToNumAddSix[i][j];
            //subArray[j].onload
            console.log("unit name: "+UnitNameToNumAddSix[i][j]);
            console.log("unit img: "+subArray[j]);
        }
        UnitImageToNumAddSix[i] = subArray
        
        console.log("team of units: "+subArray)
    }
    console.log(UnitImageToNumAddSix)
    return UnitImageToNumAddSix;
}
*/
/*
function placeUnits(UnitImageToNumAddSix){
    function placeSingleUnit(UnitImageToNumAddSix,i,j){

        let IDToIndex = 0;
        let unitTeam = 0;
        const ID = unitMatrix[i][j];
        if (ID<0){
            IDToIndex = (ID*-1)-1;
            unitTeam = 0;
        }
        else {
            IDToIndex = ID-1;
            unitTeam = 1;
        } 

        console.log("i,j,matrix ID, unit type index, unit team index, image VVV");
        console.log(i,j,ID,IDToIndex,unitTeam,UnitImageToNumAddSix[unitTeam][IDToIndex].src);

        let y = i*(48);
        let x = j*(64);

        if (j%2==1) {x+=32};
        console.log("j%2 = "+j%2);

        console.log("x pixels, y pixels"+x,y);

        ctx.drawImage(UnitImageToNumAddSix[unitTeam][IDToIndex],x,y,64,64);
        
        UnitImageToNumAddSix[unitTeam][IDToIndex].onload = function(){
            ctx.drawImage(UnitImageToNumAddSix[unitTeam][IDToIndex],x,y,64,64);
            console.log("unit team, unit type: "+unitTeam,IDToIndex)
            console.log("i,j,matrix ID, unit type index, unit team index, image VVV");
            console.log(i,j,ID,IDToIndex,unitTeam,UnitImageToNumAddSix[unitTeam][IDToIndex].src);
        }
        
        console.log("code after .onload")
    }
    for (let i = 0; i<unitMatrix.length; i++){

        console.log("length of row is: "+unitMatrix[i].length);

        for (let j = 0; j<unitMatrix[i].length;j++){
            
            if (unitMatrix[i][j]!="N"){
                placeSingleUnit(UnitImageToNumAddSix,i,j);
            }
            console.log("x,y = "+i+","+j);
        }
    }
}
*/


function insertImage(source, x, y,width,height){ 
    this.image = new Image();
    this.image.src = source;
    console.log(this.image);
    this.update = function() {
        ctx = canvas.context;
        ctx.drawImage(this.image,x,y,width,height);
    }

}

function refreshGameArea(){
    clearGameArea(); 
}
function tileXYToCanvasXY(tileXY){
    let canvasXY = [,];
    canvasXY[0] = tileXY[0]*64
    canvasXY[1] = tileXY[1]*48
    if ((tileXY[1]%2)==1){ canvasXY[0] += 32;}
    //console.log(tileXY)
    //console.log(canvasXY)
    return canvasXY
}
function updateGameArea() {
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
function clearGameArea(){
    /// replace everything in the gameArea canvas with a green colour:
    var ctx = canvas.context;
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    
    console.log(unitRed);
}
/*
  ["resources/units/playerBlu/Commander.png","resources/units/playerBlu/Healer.png","resources/units/playerBlu/Ninjer.png","resources/units/playerBlu/Sniper.png","resources/units/playerBlu/Tanker.png","resources/units/playerBlu/Trooper.png"],
        ["resources/units/playerRed/Commander.png","resources/units/playerRed/Healer.png","resources/units/playerRed/Ninjer.png","resources/units/playerRed/Sniper.png","resources/units/playerRed/Tanker.png","resources/units/playerRed/Trooper.png"]
    ];
*/
//var UnitImageToNumAddSix = intitialiseUnitVars();
//console.log("All units: "+UnitImageToNumAddSix);

//var unitRed = [(new insertImage("resources/units/playerRed/Trooper.png",100,100,64,64)),(new insertImage("resources/units/playerRed/Trooper.png",200,200,64,64))];
var unitBluCounter = 0;
var unitBlu = new Array();
var unitRedCounter = 0;
var unitRed = new Array();
var canvasXY;

function addUnit(source,tileX,tileY,stretchX,stretchY,isRed){
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

background = new insertImage("resources/grid.png",0,0,544,400);

addUnit("resources/units/playerRed/Tanker.png",0,0,64,64,true);
addUnit("resources/units/playerRed/Ninjer.png",0,1,64,64,true);
addUnit("resources/units/playerRed/Sniper.png",0,2,64,64,true);
addUnit("resources/units/playerRed/Healer.png",0,3,64,64,true);
addUnit("resources/units/playerRed/Commander.png",0,4,64,64,true);
addUnit("resources/units/playerRed/Sniper.png",0,5,64,64,true);
addUnit("resources/units/playerRed/Ninjer.png",0,6,64,64,true);
addUnit("resources/units/playerRed/Tanker.png",0,7,64,64,true);

addUnit("resources/units/playerBlu/Tanker.png",7,0,64,64,false);
addUnit("resources/units/playerBlu/Ninjer.png",7,1,64,64,false);
addUnit("resources/units/playerBlu/Sniper.png",7,2,64,64,false);
addUnit("resources/units/playerBlu/Healer.png",7,3,64,64,false);
addUnit("resources/units/playerBlu/Commander.png",7,4,64,64,false);
addUnit("resources/units/playerBlu/Sniper.png",7,5,64,64,false);
addUnit("resources/units/playerBlu/Ninjer.png",7,6,64,64,false);
addUnit("resources/units/playerBlu/Tanker.png",7,7,64,64,false);

for (let i = 0; i<8;i++){
    //canvasXY = tileXYToCanvasXY([1,i])
    //unit = new insertImage("resources/units/playerRed/Trooper.png",canvasXY[0],canvasXY[1],64,64);
    addUnit("resources/units/playerRed/Trooper.png",1,i,64,64,false);
    unitRed[unitRedCounter+i]= unit
}
unitRedCounter += 8;
console.log(unitRed);

for (let i = 0; i<8;i++){
    //canvasXY = tileXYToCanvasXY([6,i])
    //unit = new insertImage("resources/units/playerBlu/Trooper.png",canvasXY[0],canvasXY[1],64,64);
    addUnit("resources/units/playerBlu/Trooper.png",6,i,64,64,true);
    unitBlu[unitBluCounter+i]= unit
}
unitBluCounter += 8;
console.log(unitRed);

//initialiseCanvas();
refreshGameArea(canvas);

//placeUnits(UnitImageToNumAddSix);