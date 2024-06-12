class Endboss extends MovableObject {
    height = 500;
    width = 300;
    y = -35;

    IMAGES_Angry = ['./img/4_enemie_boss_chicken/2_alert/G5.png',
    './img/4_enemie_boss_chicken/2_alert/G6.png',
    './img/4_enemie_boss_chicken/2_alert/G7.png',
    './img/4_enemie_boss_chicken/2_alert/G8.png',
    './img/4_enemie_boss_chicken/2_alert/G9.png',
    './img/4_enemie_boss_chicken/2_alert/G10.png',
    './img/4_enemie_boss_chicken/2_alert/G11.png',
    './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = ['./img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ATTACK = ['./img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = ['./img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = ['./img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    movingLeft = true;
    winSound = new Audio('audio/winGame.mp3');

    constructor(){
        super().loadImage("./img/4_enemie_boss_chicken/2_alert/G5.png");
        this.x = 2500;
        this.loadImages(this.IMAGES_Angry);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 1;
        this.animate();
    }

    setWorld(world) {
        this.world = world;
    }

    animate(){
        setInterval(() =>{
            if(!this.seesTheCharacter() && !this.isHurt()){
                if(this.movingLeft){
                    this.moveLeft();
                    this.otherDirection = false;
                } else {
                    this.moveRight();
                    this.otherDirection = true;
                }
            }
            if(this.seesTheCharacter() && !this.isHurt()){
                this.speed = 5;
                if(this.checkWhereCharacterIs() < 0){
                    this.otherDirection = false;
                    this.moveLeft();
                } else {
                    this.otherDirection = true;
                    this.moveRight();
                }
            }
        }, 1000 / 20);

        setInterval(() => {
            if (this.energy === 100) {
                this.movingLeft = !this.movingLeft;
            }
        }, 2000);

        setInterval (() => {
            if (!this.seesTheCharacter()){
                this.playAnimation(this.IMAGES_WALKING);
            }
            if(this.seesTheCharacter()){
                this.playAnimation(this.IMAGES_Angry);
                this.playAnimation(this.IMAGES_ATTACK);
            }
            if(this.isHurt()){
                this.speed += 10;
                this.playAnimation(this.IMAGES_HURT);
            }
            if(this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                this.world.bgMusic.pause();
            }
        }, 100)
}

    seesTheCharacter(){
        if(this.world){
        return (Math.abs(this.world.character.x - this.x) <= 530);
    }}

    checkWhereCharacterIs(){
        return (this.world.character.x - this.x);
    }

    finalDeadAnimation(){
        this.winSound.play();
        setTimeout(() => {
            this.y -= 25;
            setInterval(() => {
                this.y += 25;
            }, 1000 / 60)
        }, 1000)
    }
}