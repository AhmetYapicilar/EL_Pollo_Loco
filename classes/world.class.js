/**
 * Represents the game world containing characters, levels, and game state.
 */
class World {

  character = new Character();
  level = new Level();
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
  musicMuted = false;
  bgMusic = new Audio("audio/backgroundMusic.mp3");
  game_over = new Audio("audio/gameOver.mp3");
  musicEnded = false;
  gameOverSoundPlayed = false;
  /**
   * Creates an instance of World.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.setWorld();
    this.keyboard = keyboard;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.run();
  }

  /**
   * Resets all variables and objects in the world.
   */
  resetVariables() {
    this.character = null;
    this.level = null;
    this.screen = null;
    this.statusbarHealth = null;
    this.statusbarBottle = null;
    this.statusbarCoin = null;
    this.statusbarEndboss = null;
    this.camera_x = null;
    this.throwableObjects = [];
    this.collectedBottles = [];
    this.throwBottles = [];
    this.coins = [];
    this.collectedCoins = [];
    this.bgMusic = null;
    this.game_over = null;
    this.musicEnded = null;
    this.gameOverSoundPlayed = null;
    this.musicMuted = null;
  }

  /**
   * Plays the background music if not muted.
   */
  playBackgroundMusic() {
    if (!this.musicMuted) {
      this.bgMusic.loop = true;
      this.bgMusic.play().catch((error) => {
        console.error("Error playing background music:", error);
      });
    }
  }

  /**
   * Plays the game over sound when the character dies.
   */
  playGameOver() {
    if (this.character.isDead() && !this.gameOverSoundPlayed) {
      this.gameOverSoundPlayed = true;
      this.game_over.play();
    }
  }

  /**
   * Initializes variables for calculations involving game objects.
   * @param {Object} object - The object to initialize variables for.
   * @returns {Object} Initialized variables.
   */
  initVariables(object) {
    let characterCenterY = this.character.y + this.character.height / 2;
    let characterCenterX = this.character.x + this.character.width / 2;
    let objectCenterY = object.y + object.height / 2;
    let objectCenterX = object.x + object.width / 2;
    return { characterCenterX, characterCenterY, objectCenterX, objectCenterY };
  }

  /**
   * Collects throwable bottles that the character collides with.
   */
  collectBottle() {
    for (let i = 0; i < this.throwableObjects.length; i++) {
      let bottle = this.throwableObjects[i];
      if (this.character.isColliding(bottle)) {
        this.takeBottle(bottle, i);
      }
    }
  }

  /**
   * Takes a bottle and adds it to collected bottles.
   * @param {ThrowableObject} bottle - The bottle to take.
   * @param {number} i - The index of the bottle in throwableObjects array.
   */
  takeBottle(bottle, i) {
    this.collectedBottles.push(bottle);
    this.statusbarBottle.setPercentage(this.collectedBottles.length * 10);
    this.throwableObjects.splice(i, 1);
  }

  /**
   * Collects bottles that fall on the ground.
   */
  collectBottleOnGround() {
    for (let i = 0; i < this.throwableObjects.length; i++) {
      let bottle = this.throwableObjects[i];
      if (
        bottle.y === 350 &&
        Math.abs(this.character.x + 40 - bottle.x) <= 20 &&
        this.character.y === 180
      ) {
        this.takeBottle(bottle);
      }
    }
  }

  /**
   * Collects coins that the character collides with.
   */
  collectCoins() {
    for (let i = 0; i < this.coins.length; i++) {
      let coin = this.coins[i];
      if (this.character.isColliding(coin)) {
        this.takeCoin(coin, i);
      }
    }
  }

  /**
   * Takes a coin and adds it to collected coins.
   * @param {Coin} coin - The coin to take.
   * @param {number} i - The index of the coin in coins array.
   */
  takeCoin(coin, i) {
    this.collectedCoins.push(coin);
    coin.playSound();
    this.statusbarCoin.setPercentage(this.collectedCoins.length * 10);
    this.coins.splice(i, 1);
  }

  /**
   * Starts the main game loops for checking collisions and updating game state.
   */
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

  /**
   * Checks if throwable bottles should be thrown based on user input.
   */
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

 /**
 * Handles the end boss getting hit by throwable bottles.
 */
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

/**
 * Reduces the end boss's energy when hit by a throwable bottle.
 * @param {Enemy} enemy - The end boss enemy object.
 */
endbossGetsHit(enemy) {
  enemy.hit();
  enemy.energy -= 15;
  if (enemy.energy <= 0) {
    enemy.energy = 0;
  }
  this.statusbarEndboss.setPercentage(enemy.energy);
}

/**
 * Handles chickens getting hit by throwable bottles.
 */
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

/**
 * Checks if a throwable bottle hits a chicken enemy.
 * @param {ThrowableObject} bottle - The throwable bottle object.
 * @param {Enemy} enemy - The chicken enemy object.
 * @returns {boolean} True if the bottle hits the chicken, otherwise false.
 */
bottleHitsChicken(bottle, enemy) {
  return (
    bottle.y >= enemy.y - 60 &&
    ((enemy.x > this.character.x &&
      Math.abs(bottle.x - (enemy.x + enemy.width - 10)) <= 30) ||
      (enemy.x < this.character.x &&
        Math.abs(bottle.x - (enemy.x + enemy.width - 10)) <= 30))
  );
}

/**
 * Handles throwable bottles falling on the ground and splashing.
 */
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

/**
 * Checks collision between the character and chicken enemies.
 */
checkCollision() {
  let i = this.level.enemies.length;
  for (let j = 0; j < i; j++) {
    const enemy = this.level.enemies[j];
    if (this.characterIsCollidingWithChicken(enemy)) {
      this.characterGetsHurt();
    }
  }
}

/**
 * Checks if the character collides with a chicken enemy.
 * @param {Enemy} enemy - The chicken enemy object.
 * @returns {boolean} True if collision occurs, otherwise false.
 */
characterIsCollidingWithChicken(enemy){
  return this.character.y > 100.5 && this.character.isColliding(enemy) && enemy.energy > 5 && !this.character.isDead();
}

/**
 * Handles the character getting hurt by a collision with a chicken enemy.
 */
characterGetsHurt() {
  this.character.hit();
  this.character.hurt_sound.play();
  this.statusbarHealth.setPercentage(this.character.energy);
}

/**
 * Handles chickens being defeated by the character.
 */
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

/**
 * Checks if the character is on top of a defeated chicken.
 * @param {number} characterCenterX - X coordinate of the character's center.
 * @param {number} objectCenterX - X coordinate of the chicken's center.
 * @returns {boolean} True if character is on the chicken, otherwise false.
 */
characterIsOnChicken(characterCenterX, objectCenterX) {
  return (
    Math.abs(characterCenterX - objectCenterX) <= 60 &&
    this.character.y > 140 &&
    this.character.y < 170 &&
    this.character.speedY < 0
  );
}

/**
 * Sets up initial references and connections for game objects.
 */
setWorld() {
  this.character.world = this;
  this.level.enemies.forEach((enemy) => enemy.setWorld(this));
  this.screen.setWorld(this);
  this.throwableObjects.forEach((bottle) => bottle.setWorld(this));
}

/**
 * Draws the game objects on the canvas.
 */
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

/**
 * Clears the canvas and redraws all game objects.
 */
drawAgain(){
  this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  this.ctx.translate(this.camera_x, 0);
  this.drawObjectsBeforeCameraIsTranslating();
  this.ctx.translate(-this.camera_x, 0);
  this.drawObjectsAfterCameraIsTranslating();
  this.ctx.translate(this.camera_x, 0);
  this.ctx.translate(-this.camera_x, 0);
  this.repeatDrawing();
}

/**
 * Adds objects to the map for rendering.
 * @param {Array} objects - The array of objects to add to the map.
 */
addObjectsToMap(objects) {
  objects.forEach((object) => {
    this.addToMap(object);
  });
}

/**
 * Adds a single object to the map for rendering.
 * @param {Object} mo - The object to add to the map.
 */
addToMap(mo) {
  if (mo.otherDirection) {
    this.flipImage(mo);
  }
  mo.draw(this.ctx);
  if (mo.otherDirection) {
    this.flipImageBack(mo);
  }
}

/**
 * Flips the image horizontally for rendering.
 * @param {Object} mo - The object whose image needs flipping.
 */
flipImage(mo) {
  this.ctx.save();
  this.ctx.translate(mo.width, 0);
  this.ctx.scale(-1, 1);
  mo.x = mo.x * -1;
}

/**
 * Restores the flipped image back to its original orientation.
 * @param {Object} mo - The object whose image was flipped.
 */
flipImageBack(mo) {
  mo.x = mo.x * -1;
  this.ctx.restore();
}

/**
 * Checks if the game is over or not started yet.
 * @returns {boolean} True if game is over or not started, otherwise false.
 */
gameIsOverOrIsNotStarted() {
  return (
    (this.character.isDead() && this.character.isDeadAnimationPlaying) ||
    (this.level.enemies[this.level.enemies.length - 1].isDead() &&
      this.level.enemies[this.level.enemies.length - 1]
        .isDeadAnimationPlaying) ||
    this.screen.startScreen
  );
}

/**
 * Draws objects on the canvas before translating the camera.
 */
drawObjectsBeforeCameraIsTranslating() {
  this.addObjectsToMap(this.level.backgroundObjects);
  this.addObjectsToMap(this.level.clouds);
  this.addObjectsToMap(this.coins);
  this.addObjectsToMap(this.throwableObjects);
  this.addObjectsToMap(this.throwBottles);
  this.addToMap(this.character);
  this.addObjectsToMap(this.level.enemies);
}

/**
 * Draws objects on the canvas after translating the camera.
 */
drawObjectsAfterCameraIsTranslating() {
  this.addToMap(this.statusbarHealth);
  this.addToMap(this.statusbarBottle);
  this.addToMap(this.statusbarCoin);
  this.addToMap(this.statusbarEndboss);
}

/**
 * Repeats the drawing process using requestAnimationFrame.
 */
repeatDrawing() {
  let self = this;
  requestAnimationFrame(function () {
    self.draw();
  });
}
}
