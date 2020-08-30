class Background {

    constructor(ctx, width, height, backgroundImage) {
      this.ctx = ctx;
      this.width = width;
      this.height = height;
  
      this.image = new Image();
      this.image.src = backgroundImage;
  
      this.posX = 0;
      this.posY = 0;

      this.ptrn = null;
      
    }
    
  
    draw() {   
      this.ptrn = this.ctx.createPattern(this.image, 'repeat');
      this.ctx.fillStyle = this.ptrn;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

}
