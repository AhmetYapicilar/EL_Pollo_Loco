class Character extends MovableObject{
    height = 250;
    width = 200;
    y = 180;
    speed = 5;
    IMAGES_Walking = ['./img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png' 
    ];
    IMAGES_JUMPING = ['./img/2_character_pepe/3_jump/J-31.png',
    './img/2_character_pepe/3_jump/J-32.png',
    './img/2_character_pepe/3_jump/J-33.png',
    './img/2_character_pepe/3_jump/J-34.png',
    './img/2_character_pepe/3_jump/J-35.png',
    './img/2_character_pepe/3_jump/J-36.png',
    './img/2_character_pepe/3_jump/J-37.png',
    './img/2_character_pepe/3_jump/J-38.png',
    './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = ['./img/2_character_pepe/5_dead/D-51.png',
    './img/2_character_pepe/5_dead/D-52.png',
    './img/2_character_pepe/5_dead/D-53.png',
    './img/2_character_pepe/5_dead/D-54.png',
    './img/2_character_pepe/5_dead/D-55.png',
    './img/2_character_pepe/5_dead/D-56.png',
    './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = ['./img/2_character_pepe/4_hurt/H-41.png',
    './img/2_character_pepe/4_hurt/H-42.png'
    ];
    world;
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jumping.mp3');
    hurt_sound = new Audio('audio/characterHurt.mp3');

    constructor(){
        super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_Walking);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        this.stopIntervals();
    }

    animate(){
       this.movingLeftInterval = setInterval(() =>{
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                if(this.isAboveGround()){
                    this.walking_sound.pause();
                } else{
                    this.walking_sound.play();
                }
               this.moveRight();
               this.otherDirection = false;
            }
            if(this.world.keyboard.LEFT && this.x > 0){
                if(this.isAboveGround()){
                    this.walking_sound.pause();
                } else{
                    this.walking_sound.play();
                }
                this.moveLeft();
                this.otherDirection = true;
            }
            if(this.world.keyboard.SPACE && !this.isAboveGround()){
                this.walking_sound.pause();
                this.jump();
                this.jumping_sound.play();
            }
            this.world.camera_x = -this.x + 100;
            this.intervals.push(this.movingLeftInterval);
        }, 1000 / 60);

        this.animationInterval = setInterval(() =>{
        if(this.isDead() && !this.isDeadAnimationPlaying){
            this.playAnimation(this.IMAGES_DEAD);
            this.world.bgMusic.pause();
            setTimeout(() => {
                this.fallInterval = setInterval(() => {
                    this.y += 10;
                }, 1000 / 60);
            }, 2000);
            if(this.y > this.world.canvas.height){
            clearInterval(this.fallInterval);
            this.isDeadAnimationPlaying = true;
            this.dead = true;
            }
        } else if(this.isHurt()){
            this.playAnimation(this.IMAGES_HURT);
        } else if(this.isAboveGround()){
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
        if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
            this.playAnimation(this.IMAGES_Walking);
        } 
    }
    }, 50); 
    this.intervals.push(this.animationInterval);
    }

    stopIntervals(){
        setInterval(() => {
            let i = this.world.level.enemies.length;
            if(this.isDead() && this.isDeadAnimationPlaying || this.world.level.enemies[i - 1].isDead()){
            this.intervals.forEach(clearInterval);
            }
        }, 1000 / 60);
    
    }

}