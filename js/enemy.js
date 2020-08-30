class Fireball {

    constructor(ctx, dx, dy, direction){

        this.ctx = ctx;
  
        this.image = new Image();
        this.image.src = 'img/fireball.png';
        
        this.sx = 0;
        this.sy = 200;

        this.sxPos = [0, 200, 400, 600, 780];
        this.framesCounter = 0;

        this.sWidth = 170;
        this.sHeight = 170;

        this.dWidth = 100;
        this.dHeight = 100,

        this.dx = dx;
        this.dy = dy;

        this.selector;

        this.direction = direction;

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
        if(this.framesCounter > 4){
            this.framesCounter = 0;
        }            
    }

}
