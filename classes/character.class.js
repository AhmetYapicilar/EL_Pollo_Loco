class Character extends MovableObject {
  height = 250;
  width = 200;
  y = 180;
  speed = 5;
  IMAGES_Walking = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];
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
  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];
  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
  ];
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
  world;
  inActivityTime = 0;
  walking_sound = new Audio("audio/walking.mp3");
  jumping_sound = new Audio("audio/jumping.mp3");
  hurt_sound = new Audio("audio/characterHurt.mp3");
  offset = {
    top: 70,
    left: 70,
    right: 60,
    bottom: 30
  };

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

  arrowRightButtonIsPushed() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  arrowLeftButtonIsPushed() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  spaceButtonIsPushed() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

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

  jumpCharacter() {
    this.walking_sound.pause();
    super.jump();
    this.jumping_sound.play();
    this.inActivityTime = 0;
  }

  characterIsDead() {
    return super.isDead() && !this.isDeadAnimationPlaying;
  }

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

  characterIsInactive() {
    return (
      !this.world.keyboard.RIGHT &&
      !this.world.keyboard.LEFT &&
      !this.isHurt() &&
      !this.world.keyboard.SPACE
    );
  }

  characterIsSleeping() {
    this.inActivityTime += 50; // Increase inactivity time
    if (this.inActivityTime >= 5000) {
      this.playAnimation(this.IMAGES_DEEPSLEEP);
    } else {
      this.playAnimation(this.IMAGES_SLEEPING);
    }
  }

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
