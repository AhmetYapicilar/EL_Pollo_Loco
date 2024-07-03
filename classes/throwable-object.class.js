class ThrowableObject extends CollectableObject {
  width = 80;
  height = 100;
  x = 100 + Math.random() * 1500;
  y = 50 + Math.random() * 200;
  world;
  rotatingInterval;
  IMAGE_BOTTLE_NORMAL = "./img/6_salsa_bottle/salsa_bottle.png";
  IMAGE_BOTTLE_GROUND1 = "./img/6_salsa_bottle/1_salsa_bottle_on_ground.png";
  IMAGE_BOTTLE_GROUND2 = "./img/6_salsa_bottle/2_salsa_bottle_on_ground.png";
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
  offset = {
    top: 5,
    left: 25,
    right: 25,
    bottom: 20
  };

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

  setWorld(world) {
    this.world = world;
  }

  throw(x, y) {
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

  bottleIsNotSplashedAndGameIsWorking(i) {
    return (
      !this.sound2Played &&
      this.world &&
      !this.world.character.isDead() &&
      !this.world.level.enemies[i - 1].isDead()
    );
  }

  bottleIsThrowedRight() {
    return !this.world.character.otherDirection;
  }

  bottleFliesRight() {
    this.rotatingInterval = setInterval(() => {
      this.x += 10;
      this.playAnimation(this.IMAGES_ROTATION);
    }, 30);
    this.intervals.push(this.rotatingInterval);
  }

  bottleFliesLeft() {
    this.rotatingInterval2 = setInterval(() => {
      this.x -= 10;
      this.playAnimation(this.IMAGES_ROTATION);
    }, 30);
    this.intervals.push(this.rotatingInterval2);
  }

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
