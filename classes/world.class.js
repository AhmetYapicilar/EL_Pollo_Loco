class World {
  character = new Character();
  level = LEVEL1;
  screen = new Screen();
  statusbarHealth = new HealthBar();
  statusbarBottle = new BottleBar();
  statusbarCoin = new CoinBar();
  statusbarEndboss = new EndbossBar();
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  throwableObjects = [
    new ThrowableObject(300),
    new ThrowableObject(500),
    new ThrowableObject(),
    new ThrowableObject(),
    new ThrowableObject(600),
    new ThrowableObject(),
    new ThrowableObject(),
    new ThrowableObject(),
    new ThrowableObject(900),
    new ThrowableObject(),
  ];
  collectedBottles = [];
  throwBottles = [];
  coins = [
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
  ];
  collectedCoins = [];
  bgMusic = new Audio("audio/backgroundMusic.mp3");
  game_over = new Audio("audio/gameOver.mp3");
  musicEnded = false;
  gameOverSoundPlayed = false;

  constructor(canvas, keyboard) {
    this.setWorld();
    this.keyboard = keyboard;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.run();
  }

  playBackgroundMusic() {
    this.bgMusic.loop = true; // Aktivieren der integrierten Schleifenfunktion

    // Spielen der Musik
    this.bgMusic.play().catch((error) => {
      console.error("Fehler beim Abspielen der Hintergrundmusik:", error);
    });
  }

  playGameOver() {
    if (this.character.isDead() && !this.gameOverSoundPlayed) {
      this.gameOverSoundPlayed = true;
      this.game_over.play();
    }
  }

  initVariables(object) {
    let characterCenterY = this.character.y + this.character.height / 2;
    let characterCenterX = this.character.x + this.character.width / 2;
    let objectCenterY = object.y + object.height / 2;
    let objectCenterX = object.x + object.width / 2;
    return { characterCenterX, characterCenterY, objectCenterX, objectCenterY };
  }

  collectBottle() {
    for (let i = 0; i < this.throwableObjects.length; i++) {
      let bottle = this.throwableObjects[i];
      const {
        characterCenterX,
        characterCenterY,
        objectCenterX,
        objectCenterY,
      } = this.initVariables(bottle);
      if (
        this.characterIsColidingWithObject(
          characterCenterX,
          characterCenterY,
          objectCenterX,
          objectCenterY
        )
      ) {
        this.takeBottle(bottle, i);
      }
    }
  }

  characterIsColidingWithObject(
    characterCenterX,
    characterCenterY,
    objectCenterX,
    objectCenterY
  ) {
    return (
      Math.abs(characterCenterY - objectCenterY) <= 40 &&
      Math.abs(characterCenterX - objectCenterX) <= 20
    );
  }

  takeBottle(bottle, i) {
    this.collectedBottles.push(bottle);
    this.statusbarBottle.setPercentage(this.collectedBottles.length * 10);
    this.throwableObjects.splice(i, 1);
  }

  collectBottleOnGround() {
    for (let i = 0; i < this.throwableObjects.length; i++) {
      let bottle = this.throwableObjects[i];
      if (
        bottle.y === 350 &&
        Math.abs(this.character.x - bottle.x) <= 40 &&
        this.character.y === 180
      ) {
        this.takeBottle(bottle);
      }
    }
  }

  collectCoins() {
    for (let i = 0; i < this.coins.length; i++) {
      let coin = this.coins[i];
      let { characterCenterX, characterCenterY, objectCenterX, objectCenterY } =
        this.initVariables(coin);

      if (
        this.characterIsColidingWithObject(
          characterCenterX,
          characterCenterY,
          objectCenterX,
          objectCenterY
        )
      ) {
        this.takeCoin(coin, i);
      }
    }
  }

  takeCoin(coin, i) {
    this.collectedCoins.push(coin[i]);
    coin.playSound();
    this.statusbarCoin.setPercentage(this.collectedCoins.length * 10);
    this.coins.splice(i, 1);
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkThrowObjects();
      this.endbossGetsBottle();
      this.chickenGetsBottle();
      this.bottleFallsOnGround();
      this.playGameOver();
    }, 200);

    setInterval(() => {
      this.collectBottle();
      this.collectBottleOnGround();
      this.collectCoins();
      this.chickenDead();
    }, 1000 / 60);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles.length > 0) {
      let bottle = new ThrowableObject(this.character.x + 50, this.character.y);
      bottle.setWorld(this);
      bottle.throw(this.character.x + 50, this.character.y);
      this.collectedBottles.splice(this.collectedBottles.length - 1, 1);
      this.statusbarBottle.setPercentage(this.collectedBottles.length * 10);
      this.throwBottles.push(bottle);
      this.character.inActivityTime = 0;
    }
  }

  endbossGetsBottle() {
    let i = this.level.enemies.length - 1;
    for (let x = 0; x < this.throwBottles.length; x++) {
      let bottle = this.throwBottles[x];
      let enemy = this.level.enemies[i];
      if (
        (enemy.x > this.character.x && bottle.x >= enemy.x - 30) ||
        (enemy.x < this.character.x && bottle.x <= enemy.x + enemy.width - 20)
      ) {
        bottle.splash();
        this.endbossGetsHit(enemy);
        this.throwBottles.splice(0, 1);
      }
    }
  }

  endbossGetsHit(enemy) {
    enemy.hit();
    enemy.energy -= 15;
    if (enemy.energy <= 0) {
      enemy.energy = 0;
    }
    this.statusbarEndboss.setPercentage(enemy.energy);
  }

  chickenGetsBottle() {
    for (let j = 0; j < this.level.enemies.length - 1; j++) {
      for (let i = 0; i < this.throwBottles.length; i++) {
        let bottle = this.throwBottles[i];
        let enemy = this.level.enemies[j];
        if (this.bottleHitsChicken(bottle, enemy)) {
          bottle.splash();
          enemy.energy = 0;
          this.throwBottles.splice(0, 1);
        }
      }
    }
  }

  bottleHitsChicken(bottle, enemy) {
    return (
      bottle.y >= enemy.y - 60 &&
      ((enemy.x > this.character.x &&
        Math.abs(bottle.x - (enemy.x + enemy.width - 10)) <= 30) ||
        (enemy.x < this.character.x &&
          Math.abs(bottle.x - (enemy.x + enemy.width - 10)) <= 30))
    );
  }

  bottleFallsOnGround() {
    if (this.throwBottles.length > 0) {
      let bottle = this.throwBottles[0];
      if (bottle.y > 400) {
        bottle.splash();
        bottle.x = -10;
        this.throwBottles.splice(0, 1);
      }
    }
  }

  checkCollision() {
    let i = this.level.enemies.length;
    for (let j = 0; j < i; j++) {
      const enemy = this.level.enemies[j];
      if (this.characterIsColidingWithChicken(enemy, i)) {
        this.characterGetsHurt();
      }
    }
  }

  characterIsColidingWithChicken(enemy, i) {
    return (
      this.character.y > 170 &&
      this.character.isColliding(enemy) &&
      enemy.energy > 5 &&
      !this.character.isDead() &&
      !this.level.enemies[i - 1].isDead()
    );
  }

  characterGetsHurt() {
    this.character.hit();
    this.character.hurt_sound.play();
    this.statusbarHealth.setPercentage(this.character.energy);
  }

  chickenDead() {
    for (let i = 0; i < this.level.enemies.length - 1; i++) {
      let chicken = this.level.enemies[i];
      const {
        characterCenterX,
        characterCenterY,
        objectCenterX,
        objectCenterY,
      } = this.initVariables(chicken);
      if (this.characterIsOnChicken(characterCenterX, objectCenterX)) {
        this.level.enemies[i].energy = 0;
      }
    }
  }

  characterIsOnChicken(characterCenterX, objectCenterX) {
    return (
      Math.abs(characterCenterX - objectCenterX) <= 60 &&
      this.character.y > 140 &&
      this.character.y < 170 &&
      this.character.speedY < 0
    );
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => enemy.setWorld(this));
    this.screen.setWorld(this);
    this.throwableObjects.forEach((bottle) => bottle.setWorld(this));
  }

  draw() {
    if (this.gameIsOverOrIsNotStarted()) {
      return;
    }
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawObjectsBeforeCameraIsTranslating();
    this.ctx.translate(-this.camera_x, 0);
    this.drawObjectsAfterCameraIsTranslating();
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
    this.repeatDrawing();
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  gameIsOverOrIsNotStarted() {
    return (
      (this.character.isDead() && this.character.isDeadAnimationPlaying) ||
      (this.level.enemies[this.level.enemies.length - 1].isDead() &&
        this.level.enemies[this.level.enemies.length - 1]
          .isDeadAnimationPlaying) ||
      this.screen.startScreen
    );
  }

  drawObjectsBeforeCameraIsTranslating() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.throwBottles);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
  }

  drawObjectsAfterCameraIsTranslating() {
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.statusbarEndboss);
  }

  repeatDrawing() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
