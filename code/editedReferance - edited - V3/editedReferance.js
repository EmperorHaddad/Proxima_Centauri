

/*
var myGameArea = document.createElement("canvas");
myGameArea.width = 480;
myGameArea.height = 270;
myGameArea.getContext("2d");
document.body.insertBefore(myGameArea, document.body.childNodes[0]);
myGameArea.frameNo = 0;
myGameArea.interval = setInterval(updateGameArea, 20);
*/

/*
var myGameArea = {
    canvas : document.getElementById("gameArea"),
    start : function() {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, 20);
        },
}
*/


var myGamePiece;

function startGame() {
    myGamePiece = new component(544, 400, "grid.png", 0, 0);
    myGameArea.start(); 
}

function component(width, height, color, x, y) {
    image = new Image();
    image.src = color;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(image, x, y, width, height);
    }
    
}

function initialiseCanvas(){
    myGameArea = document.getElementById("gameArea");
    myGameArea.context = myGameArea.getContext("2d");
    myGameArea.interval = setInterval(updateGameArea, 20);
}

function updateGameArea() {
    myGamePiece.update();
}

initialiseCanvas()
startGame()