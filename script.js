const gravAcc = 0.08;
const fricDec = 0.1;
let pieces = [];
let ledges = [];

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); 
ctx.fillStyle = "grey";
ctx.fillRect(0,0,400,400);  


class Piece {
    constructor(x, y, w, h, sx, sy, color, moveable) {
        console.log("constructing");
        this.color = color;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sx = sx;
        this.sy = sy;
        this.friction = true;
        this.moveable = moveable;
        this.base = 390;
        pieces.push(this);
        if(!moveable) {ledges.push(this);}
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        if (this.friction && this.zero() == 0) {
            if (this.sx > 0)  {  
                this.sx = (this.sx * 10 - fricDec * 10) / 10;
            }
            if (this.sx < 0)   {  
                this.sx = (this.sx * 10 + fricDec * 10) / 10;
            }
        }

        this.x += this.sx;
        // if it's greater than 
        if (this.zero() < 0 && this.moveable) {
            this.fall();
        }
    }

    fall() {
        this.sy += gravAcc;
            this.y += this.sy;
            if (this.zero() >= 0) {
                this.sy = 0;
                this.y = this.base; 
            }
            //console.log("sy: " + this.sy + " gravAcc: " + gravAcc)
    }

    zero() { 
        return this.y - this.base;
    }
}

ledge = new Piece(200, 300, 80, 10, 0, 0, "black", false);
bluePiece = new Piece(50, 390, 10, 10, 0, 0, "blue", true);

// Drawing function called on each loop
canvasDraw = function() {    
    length;
        for (i = 0 ; i < pieces.length ; i++) {
            piece = pieces[i];
            piece.draw();
            if (piece.moveable && piece.sy > 0 && piece.y <= ledge.y + 10 && piece.y >= ledge.y - 10 && piece.x >= ledge.x && piece.x <= ledge.x+ledge.w) {
                piece.y = ledge.y-10;
                piece.base = ledge.y-10;
                piece.sy = 0;
                console.log("tiggered1");
            }
            document.getElementById("info").innerHTML = "piece.x: " + piece.x + " ledge.x: " + ledge.x;
            if (piece.moveable && (piece.x <= ledge.x || piece.x >= ledge.x+ledge.w)) {
                piece.base = 390;
                console.log("tiggered2");
            }
        }
}

window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37: bluePiece.sx = -2; bluePiece.friction = false; break; 
        case 39: bluePiece.sx = 2; bluePiece.friction = false; break;
        case 32: bluePiece.sy = -5; bluePiece.y += bluePiece.sy; break;
    }    
})

window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
        case 37: bluePiece.friction = true; break;
        case 39: bluePiece.friction = true; break;
    }    
})

// Loop for drawing
    var id = setInterval(frame, 5);
    function frame() {
    if (false) {
    clearInterval(id);
    } else {
    ctx.clearRect(0,0,400,400);
    canvasDraw();
    }
}