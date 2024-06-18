class ThrowableObject extends CollectableObject {
  width = 80;
  height = 100;
  x = 100 + Math.random() * 1500;
  y = 50 + Math.random() * 200;
  world;
  rotatingInterval;
  IMAGES_ROTATION = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];
  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];
  THROW_SOUND = new Audio("audio/throwing.mp3");
  SPLASH_SOUND = new Audio("audio/bottleSplash.mp3");

  constructor(x, y) {
    super().loadImage("./img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    if (x && y) {
      this.x = x;
      this.y = y;
    }
  }

  setWorld(world) {
    this.world = world;
  }

  throw(x, y) {
    let i = this.world.level.enemies.length;
    if (!this.sound2Played && this.world && !this.world.character.isDead() && !this.world.level.enemies[i - 1].isDead()) {
      this.sound2Played = true;
      this.THROW_SOUND.play();
      this.speedY = 30;
      this.applyGravity();
      if(!this.world.character.otherDirection){
        this.rotatingInterval = setInterval(() => {
            this.x += 10;
            this.playAnimation(this.IMAGES_ROTATION);
        }, 30);
        this.intervals.push(this.rotatingInterval);
        } else {
            this.rotatingInterval2 = setInterval(() => {
                this.x -= 10;
                this.playAnimation(this.IMAGES_ROTATION);
            }, 30);
            this.intervals.push(this.rotatingInterval2);
        }
    }
  }

  /*enemyIsRight(){
    if(this.world){
        let characterX = this.world.character.x;
        let array = this.world.level.enemies;
        let enemyX = array[array.length - 1].x;
    return (enemyX - characterX > 0);
    }
  }*/

  splash() {
    let i = this.world.level.enemies.length;
    this.intervals.forEach(clearInterval);
    if (!this.soundPlayed && !this.world.character.isDead() && !this.world.level.enemies[i - 1].isDead()) {
      this.soundPlayed = true;
      setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
      }, 100);
      this.SPLASH_SOUND.play();
    }
  }
}
