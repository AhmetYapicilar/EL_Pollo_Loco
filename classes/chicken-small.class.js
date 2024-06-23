class SmallChicken extends MovableObject {
    height = 50;
    width = 80;
    y = 380;
    IMAGES_Walking = ['./img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['./img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    DEATH_SOUND = new Audio('audio/chicken_death.mp3');
    world;
    soundPlayed = false;


constructor(){
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 700 + Math.random() * 2500;
    this.loadImages(this.IMAGES_Walking);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.5 + Math.random() * 0.5;
}

setWorld(world) {
    this.world = world;
    this.animate();
}

animate(){
    this.movingLeftInterval = setInterval(() => {
    if(!this.isDead() && !this.world.screen.startScreen){
        this.moveLeft();
    }
    }, 1000 / 60);
    
    this.walkingAnimationInterval = setInterval(() =>{
        this.playAnimation(this.IMAGES_Walking);
    }, 200);
    this.intervals.push(this.walkingAnimationInterval);
   this.intervals.push(this.movingLeftInterval);

   setInterval(() => {
   // this.DEATH_SOUND.pause();
      if(this.isDead() && !this.soundPlayed){
            this.intervals.forEach((clearInterval));
            this.playAnimation(this.IMAGES_DEAD);
            
            this.DEATH_SOUND.play();
            this.soundPlayed = true;
            setTimeout(() => {
                this.removeChickenFromLevel();
            }, 100)
       }
   }, 100); 
   }

   removeChickenFromLevel() {
    const index = this.world.level.enemies.indexOf(this);
    if (index > -1) {
        this.world.level.enemies.splice(index, 1);
    } else{
        console.log('Chicken nicht verfügbar')
    }
}
}
