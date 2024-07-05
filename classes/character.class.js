/**
 * Class representing a character in the game.
 * @extends MovableObject
 */
class Character extends MovableObject {
  /**
   * The height of the character.
   * @type {number}
   */
  height = 250;

  /**
   * The width of the character.
   * @type {number}
   */
  width = 200;

  /**
   * The y-coordinate of the character.
   * @type {number}
   */
  y = 180;

  /**
   * The speed of the character.
   * @type {number}
   */
  speed = 5;

  /**
   * Array of image paths for the walking animation.
   * @type {string[]}
   */
  IMAGES_Walking = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
   * Array of image paths for the jumping animation.
   * @type {string[]}
   */
  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  /**
   * Array of image paths for the dead animation.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  /**
   * Array of image paths for the hurt animation.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
  ];

  /**
   * Array of image paths for the sleeping animation.
   * @type {string[]}
   */
  IMAGES_SLEEPING = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /**
   * Array of image paths for the deep sleep animation.
   * @type {string[]}
   */
  IMAGES_DEEPSLEEP = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /**
   * The world object that the character interacts with.
   * @type {Object}
   */
  world;

  /**
   * Time that the character has been inactive.
   * @type {number}
   */
  inActivityTime = 0;

  /**
   * Sound played when the character is walking.
   * @type {Audio}
   */
  walking_sound = new Audio("audio/walking.mp3");

  /**
   * Sound played when the character is jumping.
   * @type {Audio}
   */
  jumping_sound = new Audio("audio/jumping.mp3");

  /**
   * Sound played when the character is hurt.
   * @type {Audio}
   */
  hurt_sound = new Audio("audio/characterHurt.mp3");

  /**
   * The offset values for collision detection.
   * @type {Object}
   */
  offset = {
    top: 70,
    left: 70,
    right: 60,
    bottom: 30
  };

  /**
   * Creates a new character object.
   */
  constructor() {
    super().loadImage("./img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_Walking);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_SLEEPING);
    this.loadImages(this.IMAGES_DEEPSLEEP);
    this.applyGravity();
    this.animate();
    this.stopIntervals();
  }

  /**
   * Animates the character by moving it and playing animations.
   */
  animate() {
    this.movingLeftInterval = setInterval(() => {
      this.moveTheCharacter();
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      this.playAnimationsOfCharacter();
    }, 50);
    this.intervals.push(this.movingLeftInterval);
    this.intervals.push(this.animationInterval);
  }

  /**
   * Checks if the right arrow button is pushed.
   * @returns {boolean}
   */
  arrowRightButtonIsPushed() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Checks if the left arrow button is pushed.
   * @returns {boolean}
   */
  arrowLeftButtonIsPushed() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Checks if the space button is pushed.
   * @returns {boolean}
   */
  spaceButtonIsPushed() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Moves the character to the right.
   */
  moveCharacterRight() {
    if (this.isAboveGround()) {
      this.walking_sound.pause();
    } else {
      this.walking_sound.play();
    }
    super.moveRight();
    this.otherDirection = false;
    this.inActivityTime = 0;
  }

  /**
   * Moves the character to the left.
   */
  moveCharacterLeft() {
    if (this.isAboveGround()) {
      this.walking_sound.pause();
    } else {
      this.walking_sound.play();
    }
    super.moveLeft();
    this.otherDirection = true;
    this.inActivityTime = 0;
  }

  /**
   * Makes the character jump.
   */
  jumpCharacter() {
    this.walking_sound.pause();
    super.jump();
    this.jumping_sound.play();
    this.inActivityTime = 0;
  }

  /**
   * Checks if the character is dead.
   * @returns {boolean}
   */
  characterIsDead() {
    return super.isDead() && !this.isDeadAnimationPlaying;
  }

  /**
   * Handles the character falling out of the map.
   */
  characterFallsOutOfMap() {
    this.playAnimation(this.IMAGES_DEAD);
    this.world.bgMusic.pause();
    setTimeout(() => {
      this.fallInterval = setInterval(() => {
        this.y += 10;
      }, 1000 / 60);
    }, 2000);
    if (this.y > this.world.canvas.height) {
      clearInterval(this.fallInterval);
      this.isDeadAnimationPlaying = true;
      this.dead = true;
    }
  }

  /**
   * Checks if the character is inactive.
   * @returns {boolean}
   */
  characterIsInactive() {
    return (
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.isHurt() &&
      !this.world.keyboard.SPACE
    );
  }

  /**
   * Makes the character sleep if inactive for a long period.
   */
  characterIsSleeping() {
    this.inActivityTime += 50; // Increase inactivity time
    if (this.inActivityTime >= 5000) {
      this.playAnimation(this.IMAGES_DEEPSLEEP);
    } else {
      this.playAnimation(this.IMAGES_SLEEPING);
    }
  }

  /**
   * Moves the character based on keyboard input.
   */
  moveTheCharacter() {
    if (this.arrowRightButtonIsPushed() && !this.isDead()) {
      this.moveCharacterRight();
    }
    if (this.arrowLeftButtonIsPushed() && !this.isDead()) {
      this.moveCharacterLeft();
    }
    if (this.spaceButtonIsPushed() && !this.isDead()) {
      this.jumpCharacter();
    }
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Plays the appropriate animations for the character.
   */
  playAnimationsOfCharacter() {
    if (this.characterIsDead()) {
      this.characterFallsOutOfMap();
    } else if (this.characterIsInactive()) {
      this.characterIsSleeping();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_Walking);
      }
    }
  }

  /**
   * Stops the intervals for moving and animating the character if the character or enemies are dead.
   */
  stopIntervals() {
    setInterval(() => {
      let i = this.world.level.enemies.length;
      if (
        (this.isDead() && this.isDeadAnimationPlaying) ||
        this.world.level.enemies[i - 1].isDead()
      ) {
        this.intervals.forEach(clearInterval);
      }
    }, 1000 / 60);
  }
}
