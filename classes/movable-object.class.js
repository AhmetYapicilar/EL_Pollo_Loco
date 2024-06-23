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
      this.x + this.width >= obj.x + 20 && // ist die rechte Kante von Pepe größer als die linke Kante vom Hühnchen
      this.x <= obj.x + obj.width - 20 && // ist die linke Kante von Pepe kleiner als die rechte Kante vom Hühnchen
      this.y + this.height >= 151 && // ist die obere Kante von Pepe größer als die untere Kante des Hühnchen
      this.y <= obj.y + obj.height
    ); // ist die untere Kante von Pepe kleiner als die obere Kante vom Hühnchen
  }
  // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
}
