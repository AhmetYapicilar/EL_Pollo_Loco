/**
 * Class representing the Endboss in the game.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /**
   * The height of the Endboss.
   * @type {number}
   */
  height = 500;

  /**
   * The width of the Endboss.
   * @type {number}
   */
  width = 300;

  /**
   * The y-coordinate of the Endboss.
   * @type {number}
   */
  y = -35;

  /**
   * Array of image paths for the Endboss's angry state.
   * @type {string[]}
   */
  IMAGES_Angry = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /**
   * Array of image paths for the Endboss's walking state.
   * @type {string[]}
   */
  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  /**
   * Array of image paths for the Endboss's attack state.
   * @type {string[]}
   */
  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /**
   * Array of image paths for the Endboss's hurt state.
   * @type {string[]}
   */
  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /**
   * Array of image paths for the Endboss's dead state.
   * @type {string[]}
   */
  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Flag indicating whether the Endboss is moving left.
   * @type {boolean}
   */
  movingLeft = true;

  /**
   * Audio object for the win sound.
   * @type {HTMLAudioElement}
   */
  winSound = new Audio("audio/winGame.mp3");

  /**
   * Create an Endboss.
   */
  constructor() {
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

  /**
   * Set the world object for the Endboss.
   * @param {Object} world - The world object.
   */
  setWorld(world) {
    this.world = world;
  }

  /**
   * Animate the Endboss.
   */
  animate() {
    this.endbossIsMoving();
    this.turnDirectionEveryTwoSeconds();
    setInterval(() => {
      this.playAnimations();
      if (this.endbossIsDead()) {
        this.endbossGetsEliminated();
      }
    }, 100);
  }

  /**
   * Make the Endboss move.
   */
  endbossIsMoving() {
    setInterval(() => {
      if (this.endbossDoesNotSeeTheCharacter()) {
        this.moveLeftAndRight();
      }
      if (this.endbossSeesTheCharacter()) {
        this.followTheCharacter();
      }
    }, 1000 / 20);
  }

  /**
   * Check if the Endboss sees the character.
   * @returns {boolean}
   */
  seesTheCharacter() {
    if (this.world) {
      return Math.abs(this.world.character.x - this.x) <= 530;
    }
  }

  /**
   * Check if the Endboss does not see the character.
   * @returns {boolean}
   */
  endbossDoesNotSeeTheCharacter() {
    return !this.seesTheCharacter() && !this.isHurt();
  }

  /**
   * Check if the Endboss sees the character.
   * @returns {boolean}
   */
  endbossSeesTheCharacter() {
    return this.seesTheCharacter() && !this.isHurt() && !this.isDead();
  }

  /**
   * Move the Endboss left and right.
   */
  moveLeftAndRight() {
    if (this.movingLeft) {
      this.moveLeft();
      this.otherDirection = false;
    } else {
      this.moveRight();
      this.otherDirection = true;
    }
  }

  /**
   * Turn the direction of the Endboss every two seconds.
   */
  turnDirectionEveryTwoSeconds() {
    setInterval(() => {
      if (this.energy === 100) {
        this.movingLeft = !this.movingLeft;
      }
    }, 2000);
  }

  /**
   * Make the Endboss follow the character.
   */
  followTheCharacter() {
    this.speed = 10;
    if (this.checkWhereCharacterIs() < 0) {
      this.otherDirection = false;
      this.moveLeft();
    } else {
      this.otherDirection = true;
      this.moveRight();
    }
  }

  /**
   * Check where the character is relative to the Endboss.
   * @returns {number}
   */
  checkWhereCharacterIs() {
    return this.world.character.x - this.x;
  }

  /**
   * Play the animations for the Endboss.
   */
  playAnimations() {
    if (!this.seesTheCharacter()) {
      this.playAnimation(this.IMAGES_WALKING);
    }
    if (this.seesTheCharacter()) {
      this.playAnimation(this.IMAGES_Angry);
      this.playAnimation(this.IMAGES_ATTACK);
    }
    if (this.isHurt()) {
      this.speed += 10;
      this.playAnimation(this.IMAGES_HURT);
    }
  }

  /**
   * Check if the Endboss is dead.
   * @returns {boolean}
   */
  endbossIsDead() {
    return this.isDead() && !this.isDeadAnimationPlaying;
  }

  /**
   * Eliminate the Endboss.
   */
  endbossGetsEliminated() {
    this.playAnimation(this.IMAGES_DEAD);
    this.world.bgMusic.pause();
    this.finalDeadAnimation();
    this.dead = true;
  }

  /**
   * Play the final dead animation for the Endboss.
   */
  finalDeadAnimation() {
    this.winSound.play();
    setTimeout(() => {
      this.fallInterval = setInterval(() => {
        this.y += 10;
      }, 1000 / 60);
    }, 2000);
    if (this.y > this.world.canvas.height) {
      clearInterval(this.fallInterval);
      this.isDeadAnimationPlaying = true;
    }
  }
}

