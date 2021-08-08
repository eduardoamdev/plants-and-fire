const Game = {

    canvas: undefined,

    ctx: undefined,

    width: undefined,

    height: undefined,

    backgroundImage: 'img/desertGround.png',

    fps: 60,

    speed: 7,

    playerWidth: 450,
    playerHeight: 590,

    counter: 0,

    obstacleArr: [],

    bottomCollissionDistance: 120,
    topCollissionDistance: 15,
    leftAndRightCollissionDistance: 25,

    bottomFlameCollissionDistance: 35,
    topFlameCollissionDistance: 40,
    leftAndRightFlameCollissionDistance: 40,

    checkCollission: false,

    flameSelector: 1,
    flameArr: [],
    flameSpeed: 3,

    borderSpeed: 5,

    init: function () {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = document.getElementById('canvas');
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        this.ctx = this.canvas.getContext('2d');
        this.firstImage();
    },

    start: function () {
        this.reset()
        this.intervalID = setInterval(() => {
            this.counter++;
            this.clear();   
            if (this.counter % 5 == 0) {
                this.player.animation(this.player.orientation,
                    this.player.movement);
            }
            for (let i = 0; i < this.obstacleArr.length; i++) {
                if (this.counter % 10 == 0) {
                    this.obstacleArr[i].animation();
                }
            }
            for (let i = 0; i < this.flameArr.length; i++) {
                if (this.counter % 10 == 0) {
                    this.flameArr[i].animation();
                }
            }
            if (this.counter % 25 == 0) {
                this.flameGenerator();
            }
            this.drawAll();
            this.movePlayer();
            this.flameMovement();
            this.moveObstacles()
            this.collission();
            this.flameCollission();
            this.deleteFlames();
            if (this.checkCollission == true) {
                clearInterval(this.intervalID);
                this.defeat();
            }
            if (this.player.posX < -70 || this.player.posX > 1380 ||
                this.player.posY < -110 || this.player.posY > 640) {
                clearInterval(this.intervalID);
                this.victory();
            }
            if (this.counter == 1000) {
                this.counter = 0;
            }
        }, 1000 / this.fps)
    },


    reset: function () {
        this.background = new Background(this.ctx,
            this.width,
            this.height,
            this.backgroundImage);
        this.player = new Player(this.ctx,
            this.playerWidth,
            this.playerHeight,
            'img/character.png',
            this.width,
            this.height);
        let coordsArray = [[-5, 0], [-5, 80], [-5, 160], [-5, 240], 
            [-5, 320], [-5, 400], [-5, 480], [-5, 560], [75, 560], 
            [155, 560], [235, 560], [315, 560], [395, 560], [475, 560], 
            [555, 560], [635, 560], [715, 560], [795, 560], [875, 560], 
            [955, 560], [1035, 560], [1115, 560], [1195, 560], [1275, 560], 
            [1275, 480], [1275, 160], [1275, 80],  [1275, 0], [1195, 0],
            [1115, 0], [1035, 0], [955, 0], [875, 0], [795, 0], [715, 0],
            [635, 0], [555, 0], [475, 0], [395, 0], [315, 0], [235, 0],
            [155, 0], [75, 0], [795, 480],[795, 400],[795, 320],[795, 240],
            [795, 160],[715, 160],[635, 160],[555, 160],[475, 160],
            [395, 160],[315, 160],[315, 240],[315, 320],[235, 320],
            [235, 240],[235, 160],[555, 480],[555, 400],[555, 320],
            [1035, 80],[1035, 160],[1035, 240],[1035, 320],[1035, 400],
            [635,480],[715,480],[475,480],[395,480],[315,480],[235,480],
            [155,480],[75,480],[75,80],[75,160],[75,240],[75,320],[75,400]]
        coordsArray.forEach((coord) => 
            this.obstacleArr.push(new Obstacle(this.ctx, coord[0], coord[1])));
        this.player.playerMovement();
        this.song = new Audio();
        this.song.src = this.gameSound;
    },

    clear: function () {
        this.ctx.clearRect(0, 0, this.width, this.height)
    },

    drawAll: function () {

        this.background.draw();

        this.obstacleArr.forEach(obstacle => obstacle.draw())
        
        this.player.draw();

        for (let i = 0; i < this.flameArr.length; i++) {
            this.flameArr[i].draw();
        }

    },

    movePlayer() {

        if (this.player.keyState.keyLeft) {
            this.player.posX -= this.speed;
        } else if (this.player.keyState.keyUp) {
            this.player.posY -= this.speed;
        } else if (this.player.keyState.keyRight) {
            this.player.posX += this.speed;
        } else if (this.player.keyState.keyDown) {
            this.player.posY += this.speed;
        }

    },

    collission() {

        for (let i = 0; i < this.obstacleArr.length; i++) {

            if (this.player.posX + this.player.dWidth -
                this.leftAndRightCollissionDistance > this.obstacleArr[i].dx &&
                this.player.posX < this.obstacleArr[i].dx +
                this.obstacleArr[i].dWidth -
                this.leftAndRightCollissionDistance &&
                this.player.posY < this.obstacleArr[i].dy +
                this.obstacleArr[i].dHeight - this.bottomCollissionDistance &&
                this.player.posY + this.player.dHeight -
                this.topCollissionDistance > this.obstacleArr[i].dy) {
                this.checkCollission = true;
            }
        }
    },

    flameGenerator() {

        this.flameSelector = Math.floor(Math.random() * (5 - 1)) + 1;
        if (this.flameSelector == 1) {
            this.flameArr.push(new Fireball(this.ctx, 
                Math.floor(Math.random() * 1000 - 100) + 100, -70, 1));
        }
        if (this.flameSelector == 2) {
            this.flameArr.push(new Fireball(this.ctx, this.width + 70, 
                Math.floor(Math.random() * (500 - 100)) + 100, 2));
        }
        if (this.flameSelector == 3) {
            this.flameArr.push(new Fireball(this.ctx, 
                Math.floor(Math.random() * (1000 - 100)) + 100, this.height + 70, 3));
        }
        if (this.flameSelector == 4) {
            this.flameArr.push(new Fireball(this.ctx, -70, 
                Math.floor(Math.random() * (500 - 100)) + 100, 4));
        }

    },

    flameMovement() {

        for (let i = 0; i < this.flameArr.length; i++) {
            if (this.flameArr[i].direction == 1) {
                this.flameArr[i].dy += this.flameSpeed;
            } else if (this.flameArr[i].direction == 2) {
                this.flameArr[i].dx -= this.flameSpeed;
            } else if (this.flameArr[i].direction == 3) {
                this.flameArr[i].dy -= this.flameSpeed;
            } else if (this.flameArr[i].direction == 4) {
                this.flameArr[i].dx += this.flameSpeed;
            }
        }

    },

    flameCollission() {

        for (let i = 0; i < this.flameArr.length; i++) {

            if (this.player.posX + this.player.dWidth -
                this.leftAndRightFlameCollissionDistance > this.flameArr[i].dx &&
                this.player.posX < this.flameArr[i].dx +
                this.flameArr[i].dWidth -
                this.leftAndRightFlameCollissionDistance &&
                this.player.posY < this.flameArr[i].dy +
                this.flameArr[i].dHeight - this.bottomFlameCollissionDistance &&
                this.player.posY + this.player.dHeight -
                this.topFlameCollissionDistance > this.flameArr[i].dy) {
                this.checkCollission = true;
            }
        }

    },

    deleteFlames() {

        this.flameArr = this.flameArr.filter(element => element.dx > -300);
        this.flameArr = this.flameArr.filter(element => element.dx < (this.width + 300));
        this.flameArr = this.flameArr.filter(element => element.dy > -300);
        this.flameArr = this.flameArr.filter(element => element.dy < (this.height + 300));

    },

    moveObstacles(){
        for(let i = 0; i < 45; i++){
            if(this.obstacleArr[i].dx == -5 && 
                this.obstacleArr[i].dy > 0){
                this.obstacleArr[i].dy-= this.borderSpeed;
            }else if(this.obstacleArr[i].dx < 1275 && 
                this.obstacleArr[i].dy == 0){
                this.obstacleArr[i].dx+= this.borderSpeed;
            }else if(this.obstacleArr[i].dx == 1275 && 
                this.obstacleArr[i].dy < 560){
                this.obstacleArr[i].dy+= this.borderSpeed;
            }else if(this.obstacleArr[i].dx > -5 && 
                this.obstacleArr[i].dy == 560){
                this.obstacleArr[i].dx-= this.borderSpeed;
                }
        }
    },

    defeat: function(){
        this.defeatReset()
        this.song.pause();
        this.defeatIntervalID = setInterval(() => {           
            this.clear();
            this.counter++;
            for (let i = 0; i < this.flameArr.length; i++) {
                if (this.counter % 10 == 0) {
                    this.flameArr[i].animation();
                }
            }                
            this.flameGenerator();
            this.defeatDrawAll();
            this.flameMovement();
            this.deleteFlames();
            if (this.counter > 1000 && this.counter < 1100) {
                document.location.reload();
            }
            if (this.counter == 2000) {
                this.counter = 0;
            }
        }, 1000 / this.fps)
    },

    defeatReset: function () {
        this.background = new Background(this.ctx,
            this.width,
            this.height,
            this.backgroundImage);
    },
    
    defeatDrawAll: function () {

        this.background.draw();

        for (let i = 0; i < this.flameArr.length; i++) {
            this.flameArr[i].draw();
        }

    },

    victory: function(){
        this.victoryReset()
        this.victoryIntervalID = setInterval(() => {
            this.clear();
            this.counter++;
            this.victoryDrawAll();
            if (this.counter > 250 & this.counter < 1000){
                document.location.reload();
            }
            if (this.counter == 2000) {
                this.counter = 0;
            }
        }, 1000 / this.fps)
    },

    victoryReset: function () {
        this.background = new Background(this.ctx,
            this.width,
            this.height,
            this.backgroundImage);
    },
    
    victoryDrawAll: function () {

        this.background.draw();

    },

    firstImage: function(){
        this.firstImageReset()
        this.firstImageIntervalID = setInterval(() => {
            this.clear();
            this.counter++;
            this.firstImageDrawAll();
            if (this.counter > 300 && this.counter < 400){
                clearInterval(this.firstImageIntervalID);
                this.start();
            }
            if (this.counter == 1000) {
                this.counter = 0;
            }
        }, 1000 / this.fps)
    },

    firstImageReset: function () { 
        this.background = new Background(this.ctx,
            this.width,
            this.height,
            this.backgroundImage);
    },
    
    firstImageDrawAll: function () {

        this.background.draw();

    },

}
