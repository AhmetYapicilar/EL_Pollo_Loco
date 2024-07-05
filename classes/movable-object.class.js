/**
 * Represents a movable object in the game.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {
  /**
   * Speed of the object.
   * @type {number}
   */
  speed = 0.2;

  /**
   * Vertical speed of the object.
   * @type {number}
   */
  speedY = 0;

  /**
   * Reference to the game world.
   * @type {World}
   */
  world;

  /**
   * Acceleration factor.
   * @type {number}
   */
  acceleration = 2.5;

  /**
   * Flag indicating the direction of movement.
   * @type {boolean}
   */
  otherDirection = false;

  /**
   * Energy level of the object.
   * @type {number}
   */
  energy = 100;

  /**
   * Timestamp of the last hit.
   * @type {number}
   */
  lastHit = 0;

  /**
   * Flag indicating if a sound has been played.
   * @type {boolean}
   */
  soundPlayed = false;

  /**
   * Flag indicating if a secondary sound has been played.
   * @type {boolean}
   */
  sound2Played = false;

  /**
   * Interval ID for the leftward movement animation.
   * @type {number}
   */
  movingLeftInterval;

  /**
   * Interval ID for the walking animation.
   * @type {number}
   */
  walkingAnimationInterval;

  /**
   * Flag indicating if the death animation is playing.
   * @type {boolean}
   */
  isDeadAnimationPlaying = false;

  /**
   * Interval ID for the falling animation.
   * @type {number}
   */
  fallInterval;

  /**
   * Interval ID for the general animation.
   * @type {number}
   */
  animationInterval;

  /**
   * Flag indicating if the object is dead.
   * @type {boolean}
   */
  dead = false;

  /**
   * Offset values for collision detection.
   * @type {{ top: number, left: number, right: number, bottom: number }}
   */
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  /**
   * Sets the game world for the object.
   * @param {World} world - The game world object.
   */
  setWorld(world){
    this.world = world;
  }

  /**
   * Moves the object to the right based on its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left based on its speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays the animation using the provided images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Applies gravity to the object.
   * Gravity makes the object fall down if it's above ground or moving downward.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Initiates a jump with optional vertical speed.
   * @param {number} [x] - Optional vertical speed for the jump.
   */
  jump(x) {
    if (x) {
      this.speedY = x;
    } else {
      this.speedY = 30;
    }
  }

  /**
   * Decreases the energy of the object upon being hit.
   */
  hit() {
    if (this.energy <= 0) {
      this.energy = 0;
    } else {
      this.energy -= 5;
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is currently in a hurt state.
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the object is dead (energy is zero).
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Checks if the object is colliding with another object.
   * @param {DrawableObject} obj - The other object to check collision with.
   * @returns {boolean} True if the object is colliding with the other object, false otherwise.
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }
}

