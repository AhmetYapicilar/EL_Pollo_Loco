class MovableObject extends DrawableObject {
  speed = 0.2;
  speedY = 0;
  world;
  acceleration = 2.5;
  otherDirection = false;
  energy = 100;
  lastHit = 0;
  soundPlayed = false;
  sound2Played = false;
  intervals = [];
  movingLeftInterval;
  walkingAnimationInterval; 
  isDeadAnimationPlaying = false;
  fallInterval;
  animationInterval;
  dead = false;

  setWorld(world){
    this.world = world;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  jump(x) {
    if(x){
      this.speedY = x;
    } else{
    this.speedY = 30;
    }
  }

  hit() {
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.energy -= 5;
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x + 20 && 
      this.x <= obj.x + obj.width - 20 && 
      this.y + this.height >= 151 && 
      this.y <= obj.y + obj.height
    ); 
  }
}
