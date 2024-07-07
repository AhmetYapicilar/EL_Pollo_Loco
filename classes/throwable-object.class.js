/**
 * Represents a throwable object in the game, extending from CollectableObject.
 * @extends CollectableObject
 */
class ThrowableObject extends CollectableObject {
  /**
   * Width of the throwable object.
   * @type {number}
   */
  width = 80;

  /**
   * Height of the throwable object.
   * @type {number}
   */
  height = 100;

  /**
   * X-coordinate position of the throwable object.
   * @type {number}
   */
  x = 100 + Math.random() * 1500;

  /**
   * Y-coordinate position of the throwable object.
   * @type {number}
   */
  y = 50 + Math.random() * 200;

  /**
   * Reference to the world object where the throwable object exists.
   * @type {World}
   */
  world;

  /**
   * Interval ID for rotating animation of the throwable object.
   * @type {number}
   */
  rotatingInterval;

  /**
   * Image path for the normal state of the throwable object.
   * @type {string}
   */
  IMAGE_BOTTLE_NORMAL = "./img/6_salsa_bottle/salsa_bottle.png";

  /**
   * Image path for the throwable object on ground state 1.
   * @type {string}
   */
  IMAGE_BOTTLE_GROUND1 = "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png";

  /**
   * Image path for the throwable object on ground state 2.
   * @type {string}
   */
  IMAGE_BOTTLE_GROUND2 = "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png";

  /**
   * Array of image paths for rotation animation of the throwable object.
   * @type {string[]}
   */
  IMAGES_ROTATION = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Array of image paths for splash animation of the throwable object.
   * @type {string[]}
   */
  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Audio object for the throwing sound of the throwable object.
   * @type {HTMLAudioElement}
   */
  THROW_SOUND = new Audio("audio/throwing.mp3");

  /**
   * Audio object for the splash sound of the throwable object.
   * @type {HTMLAudioElement}
   */
  SPLASH_SOUND = new Audio("audio/bottleSplash.mp3");

  /**
   * Offset values for collision detection of the throwable object.
   * @type {{ top: number, left: number, right: number, bottom: number }}
   */
  offset = {
    top: 5,
    left: 25,
    right: 25,
    bottom: 20
  };

  /**
   * Constructs a new ThrowableObject.
   * @param {number} x - Initial x-coordinate position of the throwable object.
   */
  constructor(x) {
    super().loadImage(this.IMAGE_BOTTLE_NORMAL);
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    if (x) {
      this.loadImage(this.IMAGE_BOTTLE_GROUND1);
      this.x = x;
      this.y = 350;
      if (Math.random() < 0.5) {
        this.loadImage(this.IMAGE_BOTTLE_GROUND1);
      } else {
        this.loadImage(this.IMAGE_BOTTLE_GROUND2);
      }
    }
  }

  /**
   * Sets the world reference for the throwable object.
   * @param {World} world - The world object to set.
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Throws the throwable object at specified coordinates.
   * @param {number} x - X-coordinate to throw the object to.
   * @param {number} y - Y-coordinate to throw the object to.
   */
  throw(x, y) {
    if(this.world.muteBottleSounds){
      this.SPLASH_SOUND.muted = true;
      this.THROW_SOUND.muted = true;
    }
    let i = this.world.level.enemies.length;
    if (this.bottleIsNotSplashedAndGameIsWorking(i)) {
      this.sound2Played = true;
      this.THROW_SOUND.play();
      this.speedY = 30;
      this.y = y;
      this.applyGravity();
      if (this.bottleIsThrowedRight()) {
        this.bottleFliesRight();
      } else {
        this.bottleFliesLeft();
      }
    }
  }

  /**
   * Checks if the throwable object is not splashed and the game is active.
   * @param {number} i - Index of the enemy in the enemies array.
   * @returns {boolean} True if the bottle is not splashed and game is active, false otherwise.
   */
  bottleIsNotSplashedAndGameIsWorking(i) {
    return (
      !this.sound2Played &&
      this.world &&
      !this.world.character.isDead() &&
      !this.world.level.enemies[i - 1].isDead()
    );
  }

  /**
   * Checks if the throwable object is thrown towards the right direction.
   * @returns {boolean} True if the bottle is thrown towards the right, false if left.
   */
  bottleIsThrowedRight() {
    return !this.world.character.otherDirection;
  }

  /**
   * Initiates the rotation and movement of the throwable object flying towards the right.
   */
  bottleFliesRight() {
    this.rotatingInterval = setInterval(() => {
      this.x += 10;
      this.playAnimation(this.IMAGES_ROTATION);
    }, 30);
    this.intervals.push(this.rotatingInterval);
  }

  /**
   * Initiates the rotation and movement of the throwable object flying towards the left.
   */
  bottleFliesLeft() {
    this.rotatingInterval2 = setInterval(() => {
      this.x -= 10;
      this.playAnimation(this.IMAGES_ROTATION);
    }, 30);
    this.intervals.push(this.rotatingInterval2);
  }

  /**
   * Initiates the splash animation and sound effect when the throwable object hits the ground or an enemy.
   */
  splash() {
    let i = this.world.level.enemies.length;
    this.intervals.forEach(clearInterval);
    if (
      !this.soundPlayed &&
      !this.world.character.isDead() &&
      !this.world.level.enemies[i - 1].isDead()
    ) {
      this.soundPlayed = true;
      setInterval(() => {
        this.playAnimation(this.IMAGES_SPLASH);
      }, 100);
      this.SPLASH_SOUND.play();
    }
  }
}
