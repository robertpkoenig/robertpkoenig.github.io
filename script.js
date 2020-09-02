var id = 0;
let x = 10;
let y = 10;
let xIncr = Math.random()*10;
let yIncr = Math.random()*10;
let pieces = [];
let animation = true;
let jumpSteps = [];
for (i = 0 ; i < 100 ; i++) {
    if (i >= 0 && i <= 50) {
        jumpSteps[i] = -2;
    }
    if (i > 50) {
        jumpSteps[i] = 2;
    }
}
jumpSteps.push(0);
let jumpInc = 0;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "grey";
ctx.fillRect(0,0,400,400);  


class Piece {
    constructor(x, y, w, h, sx, sy, color) {
        console.log("constructing");
        this.color = color;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.sx = sx;
        this.sy = sy;
        this.jumpOn = false;
        this.jumpSteps = 0;
        this.draw();
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        this.x += this.sx;
        this.y += this.sy;
        if (this.jumpOn) {
            this.jump();
        }
    }
    freeMove() {
        if (this.y > 369) {
            if (this.x >= bluePiece.x && this.x <= bluePiece.x + 80) {
                this.sy *= -1;
                this.color = "green";
            }
            else {
                ctx.fillStyle = "grey";
                ctx.fillRect(0, 0, 400, 400);
                redPiece.x = 1;
                redPiece.y = 1;
                animation = true;
                animate();
                return;
            }
        }
        if (this.x > 379) {
            this.sx *= -1;
        }
        if (this.y > 379) {
            this.sy *= -1;
        }
        if (this.x < 1) {
            this.sx *= -1;
        }
        if (this.y < 1) {
            this.sy *= -1;
        }
        this.y += this.sy;
        this.x += this.sx;
    }
    jump() {
        this.sy = jumpSteps[jumpInc];
        jumpInc++;
        console.log("This JumpInc: " + jumpInc);
        console.log("This Y: " + this.y);

        if (jumpInc > jumpSteps.length - 1) {
            jumpInc = 0;
            this.jumpOn = false;
        }
    }
}

bluePiece = new Piece(1, 390, 10, 10, 0, 0, "blue");
pieces.push(bluePiece);

// Drawing function called on each loop
canvasDraw = function() {    
    bluePiece.draw();
        // for (i = 0 ; i < pieces.length ; i++) {
        //     pieces[i].draw();
        //     p.move();
        //     console.log("hello");
        // }
}

function start() {
    animate();
    animation = false;
}

window.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 37: bluePiece.sx = -2; break;
        case 39: bluePiece.sx = 2; break;
        case 32: bluePiece.jumpOn = true; break;
    }    
})

window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
        case 37: bluePiece.sx = 0; break;
        case 39: bluePiece.sx = 0; break;
    }    
})

// Loop for drawing
function animate() {
    var id = setInterval(frame, 5);
    function frame() {
    if (animation) {
    clearInterval(id);
    } else {
    ctx.clearRect(0,0,400,400);
    canvasDraw();
    }
}
}