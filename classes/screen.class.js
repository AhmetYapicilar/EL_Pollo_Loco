class Screen extends DrawableObject {
    x = 0;
    y = 0;
    height = 480;
    width = 720;
    i;
    startScreen = true;
    IMAGE_INTRO = './img/9_intro_outro_screens/start/startscreen_1.png';
    IMAGE_GAMEOVER = './img/9_intro_outro_screens/game_over/game over!.png';
    IMAGE_WIN = './img/9_intro_outro_screens/win/win_2.png';
    world;

    constructor(){
        super();
    }

    setWorld(world) {
        this.world = world;
        
        this.animate();
    }

    animate(){
        setInterval(() => {
            if (this.startScreen){
                this.loadImage(this.IMAGE_INTRO);
                this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
                this.world.ctx.drawImage(this.img, 0, 0, this.world.canvas.width, this.world.canvas.height);   
            }
            this.i = this.world.level.enemies.length - 1;
             if(this.world.level.enemies[this.i].isDeadAnimationPlaying && !this.startScreen){
                this.loadImage(this.IMAGE_WIN);
                this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
                this.world.ctx.drawImage(this.img, 0, 0, this.world.canvas.width, this.world.canvas.height);
                this.reloadPage();       
            } else if(this.world.character.isDeadAnimationPlaying && !this.startScreen){
                this.loadImage(this.IMAGE_GAMEOVER);
                this.world.ctx.clearRect(0, 0, this.world.canvas.width, this.world.canvas.height);
                this.world.ctx.drawImage(this.img, 0, 0, this.world.canvas.width, this.world.canvas.height);    
                this.reloadPage();   
            } 
        }, 1000 / 60);
       
    }

    reloadPage(){
        setTimeout(() => {
            this.clearAllIntervals();
            window.location.reload();
        }, 2000);
    }

    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) {
            window.clearInterval(i);
        }
    }
}