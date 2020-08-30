class Obstacle {

    constructor(ctx, dx, dy){

        this.ctx = ctx;
  
        this.image = new Image();
        this.image.src = 'img/enemies.png';

        this.sx = 0;
        this.sy = 0;

        this.sxPos = [0, 17, 39, 59];
        this.framesCounter = 0;

        this.sWidth = 18;
        this.sHeight = 40;

        this.dWidth = 70;
        this.dHeight = 140,

        this.dx = dx;
        this.dy = dy;

    }

    draw() { 
        this.ctx.drawImage(
            this.image, 
            this.sx,
            this.sy,
            this.sWidth,
            this.sHeight,
            this.dx,
            this.dy,
            this.dWidth,
            this.dHeight,
        );
    }

    animation(){
        this.sx = this.sxPos[this.framesCounter];
        this.framesCounter++;
        if(this.framesCounter > 3){
            this.framesCounter = 0;
        }            
    }

}
