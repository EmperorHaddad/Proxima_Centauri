/*
tutorials learnt:
- getting started with the first basic syntax of JS - https://www.youtube.com/watch?v=UUFPEgRKwf4 - "Create Your First 
JavaScript Game - Introduction to JavaScript Game Development"
- why image/drawing won't appear on canvas - https://stackoverflow.com/questions/6011378/how-to-add-image-to-canvas  
- specific sysntaxes - https://www.w3schools.com/js/default.asp 

Tools used: 
- code editor - https://code.visualstudio.com/ - Microsift Visual studio 
- lightweight pixel art maker - https://www.piskelapp.com/ - Piskel
- more advanced pixel art maker - https://www.aseprite.org/ - Aseprite
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

///set up to uterlise the canvas as the game area:
var canvas = document.getElementById("gameArea");
var ctx = canvas.getContext("2d");

/// declear the grid as the background image:
var background = new Image();
background.src = "resources/grid.png";
console.log(background);

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

function intitialiseUnitVars(){ // setting up the image appearance to each corrosponding unit
    const UnitNameToNumAddSix = [ /* the index of unit image corropsond, subtracted by 6, corrospond to the unit's ID in the 
        'unitMatrix' (except 'unitMatrix' ID "E", which means its empty) - E.G.: the second item in array (index number is 1) 
        corrospond to the 'unitMatrix' ID of -5 */
        ["resources/units/playerBlu/Commander.png","resources/units/playerBlu/Healer.png","resources/units/playerBlu/Ninjer.png","resources/units/playerBlu/Sniper.png","resources/units/playerBlu/Tanker.png","resources/units/playerBlu/Trooper.png"],
        ["resources/units/playerRed/Commander.png","resources/units/playerRed/Healer.png","resources/units/playerRed/Ninjer.png","resources/units/playerRed/Sniper.png","resources/units/playerRed/Tanker.png","resources/units/playerRed/Trooper.png"]
    ];
    /*
    function returnImage(fileLocation){
        let image = new Image();
        image = fileLocation;
        return image;
    }
    */
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

function refreshGameArea(){
    clearGameArea(); 
}

/// replace everything in the gameArea canvas with a green colour:
function clearGameArea(){
    ctx.fillStyle = "green";
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    //ctx.drawImage(background,0,0,canvas.width,canvas.height);
    ///neccesity of the '.onload' property to load the image (seems to be vital only to some computers, including mine)
    
    background.onload = function(){
        ctx.drawImage(background,0,0,canvas.width,canvas.height);
      }
    /*
    UnitImageToNumAddSix[0][0].onload = function(){
        ctx.drawImage(UnitImageToNumAddSix[1][0],300,300,64,64);
      }
    */

}

var UnitImageToNumAddSix = intitialiseUnitVars();
console.log("All units: "+UnitImageToNumAddSix);

refreshGameArea();
placeUnits(UnitImageToNumAddSix);