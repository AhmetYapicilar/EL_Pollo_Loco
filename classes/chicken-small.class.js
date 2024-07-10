/**
 * Class representing a small chicken enemy in the game.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
  /**
   * The height of the small chicken.
   * @type {number}
   */
  height = 50;

  /**
   * The width of the small chicken.
   * @type {number}
   */
  width = 80;

  /**
   * The y-coordinate of the small chicken.
   * @type {number}
   */
  y = 380;

  /**
   * Array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_Walking = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Array of image paths for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  /**
   * Sound played when the chicken dies.
   * @type {Audio}
   */
  DEATH_SOUND = new Audio("audio/chicken_death.mp3");

  /**
   * The world object that the small chicken interacts with.
   * @type {Object}
   */
  world;

  /**
   * Indicates whether the death sound has been played.
   * @type {boolean}
   */
  soundPlayed = false;

  /**
   * The offset values for collision detection.
   * @type {Object}
   */
  offset = {
    top: 10,
    left: 20,
    right: 20,
    bottom: 10,
  };

  /**
   * Creates a new small chicken object.
   */
  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.x = 700 + Math.random() * 2500;
    this.loadImages(this.IMAGES_Walking);
    this.loadImages(this.IMAGES_DEAD);
    this.speed = 0.5 + Math.random() * 0.5;
  }

  /**
   * Sets the world object for the small chicken.
   * @param {Object} world - The world object.
   */
  setWorld(world) {
    this.world = world;
    this.animate();
  }

  /**
   * Animates the small chicken by moving it and playing animations.
   */
  animate() {
    this.chickenIsMovingLeft();
    this.chickenIsMovingAnimationIsPlaying();
    this.intervals.push(this.walkingAnimationInterval);
    this.intervals.push(this.movingLeftInterval);

    setInterval(() => {
      if (this.chickenIsDead()) {
        this.chickenGetsEliminated();
      }
    }, 100);
  }

  /**
   * Checks if the chicken is alive and the game has started.
   * @returns {boolean}
   */
  chickenIsAliveAndGameHasStarted() {
    return (
      !this.isDead() &&
      !this.world.screen.startScreen &&
      !this.world.screen.winScreen
    );
  }

  /**
   * Moves the chicken to the left.
   */
  chickenIsMovingLeft() {
    this.movingLeftInterval = setInterval(() => {
      if (this.chickenIsAliveAndGameHasStarted()) {
        super.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Plays the walking animation for the chicken.
   */
  chickenIsMovingAnimationIsPlaying() {
    this.walkingAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_Walking);
    }, 200);
  }

  /**
   * Checks if the chicken is dead.
   * @returns {boolean}
   */
  chickenIsDead() {
    return this.isDead() && !this.soundPlayed;
  }

  /**
   * Removes the chicken from the map after a delay.
   */
  removeChickenFromMap() {
    setTimeout(() => {
      this.removeChickenFromLevel();
    }, 100);
  }

  /**
   * Handles the chicken getting eliminated.
   */
  chickenGetsEliminated() {
    this.intervals.forEach(clearInterval);
    this.playAnimation(this.IMAGES_DEAD);

    this.DEATH_SOUND.play();
    this.soundPlayed = true;
    this.removeChickenFromMap();
  }

  /**
   * Removes the chicken from the level.
   */
  removeChickenFromLevel() {
    const index = this.world.level.enemies.indexOf(this);
    if (index > -1) {
      this.world.level.enemies.splice(index, 1);
    } else {
      console.log("Chicken nicht verfügbar");
    }
  }  
}
