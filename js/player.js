class Player {

    constructor(ctx, 
        width, 
        height, 
        image, 
        gameWidth, 
        gameHeight,) {
        
        this.ctx = ctx;
        this.width = width;
        this.height = height;
  
        this.image = new Image();
        this.image.src = image;

        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
  
        this.posX = gameWidth / 2;
        this.posY = gameHeight / 2;

        this.dWidth = 60;
        this.dHeight = 100;

        this.keyState = {
            keyLeft: false,
            keyRight: false,
            keyUp: false,
            keyDown: false,
        }

        this.dx = 470;
        this.dy = 0;

        this.dxPos = [0, 470, 920, 1380];
        this.dyPos = [0, 580, 1210, 1820];

        this.framesCounterX = 0;
        this.framesCounterY = 0;

        this.orientation = "S";
        this.movement = false;

        this.keyId = 0;

    }
  
    draw() { 
        this.ctx.drawImage(
            this.image, 
            this.dx,
            this.dy,
            this.width,
            this.height,
            this.posX, 
            this.posY, 
            this.dWidth,
            this.dHeight,
        );
    }

    playerMovement(){
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            if (e.keyCode === 37 &&
                this.keyId != 2 &&
                this.keyId != 3 &&
                this.keyId != 4) {
                this.keyState.keyLeft = true;
                this.orientation = "W";
                this.movement = true;
                this.keyId = 1;
            }
            if (e.keyCode === 38 &&
                this.keyId != 1 &&
                this.keyId != 3 &&
                this.keyId != 4) {
                this.keyState.keyUp = true;
                this.orientation = "N";
                this.movement = true;
                this.keyId = 2;
            }
            if (e.keyCode === 39 &&
                this.keyId != 1 &&
                this.keyId != 2 &&
                this.keyId != 4) {
                this.keyState.keyRight = true;
                this.orientation = "E";
                this.movement = true;
                this.keyId = 3;
            }
            if (e.keyCode === 40 &&
                this.keyId != 1 &&
                this.keyId != 2 &&
                this.keyId != 3) {
                this.keyState.keyDown = true;
                this.orientation = "S";
                this.movement = true;
                this.keyId = 4;
            }
        })
        document.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.keyCode === 37) {
                this.keyState.keyLeft = false;
                this.orientation = "W";
                this.movement = false;
                this.keyId = 0;
            }
            if (e.keyCode === 38) {
                this.keyState.keyUp = false;
                this.orientation = "N";
                this.movement = false;
                this.keyId = 0;
            }
            if (e.keyCode === 39) {
                this.keyState.keyRight = false;
                this.orientation = "E";
                this.movement = false;
                this.keyId = 0;
            }
            if (e.keyCode === 40) {
                this.keyState.keyDown = false;
                this.orientation = "S";
                this.movement = false;
                this.keyId = 0;
            }
        })
    }

    animation(direction, move){
        if(direction == "W" && move == true){
            this.framesCounterY = 2;
            this.dx = this.dxPos[this.framesCounterX];
            this.dy = this.dyPos[this.framesCounterY];
            if(this.framesCounterX == 3){
                this.framesCounterX = 0;
            }else{
                this.framesCounterX++;
            }
        }else if(direction == "N" && move == true){
            this.framesCounterY = 3;
            this.dx = this.dxPos[this.framesCounterX];
            this.dy = this.dyPos[this.framesCounterY];
            if(this.framesCounterX == 3){
                this.framesCounterX = 0;
            }else{
                this.framesCounterX++;
            }
        }else if(direction == "E" && move == true){
            this.framesCounterY = 1;
            this.dx = this.dxPos[this.framesCounterX];
            this.dy = this.dyPos[this.framesCounterY];
            if(this.framesCounterX == 3){
                this.framesCounterX = 0;
            }else{
                this.framesCounterX++;
            }
        }else if(direction == "S" && move == true){
            this.framesCounterY = 0;
            this.dx = this.dxPos[this.framesCounterX];
            this.dy = this.dyPos[this.framesCounterY];
            if(this.framesCounterX == 3){
                this.framesCounterX = 0;
            }else{
                this.framesCounterX++;
            }
        }else if(direction == "W" && move == false){
            this.framesCounterY = 2;
            this.framesCounterX = 0;
            this.dx = this.dxPos[this.framesCounterX];
            this.dy = this.dyPos[this.framesCounterY];
        }else if(direction == "N" && move == false){
            this.framesCounterY = 3;
            this.framesCounterX = 1;
            this.dx = this.dxPos[this.framesCounterX];
            this.dy = this.dyPos[this.framesCounterY];
        }else if(direction == "E" && move == false){
            this.framesCounterY = 1;
            this.framesCounterX = 1;
            this.dx = this.dxPos[this.framesCounterX];
            this.dy = this.dyPos[this.framesCounterY];
        }else if(direction == "S" && move == false){
            this.framesCounterY = 0;
            this.framesCounterX = 1;
            this.dx = this.dxPos[this.framesCounterX];
            this.dy = this.dyPos[this.framesCounterY];
        }
    }

} 
 