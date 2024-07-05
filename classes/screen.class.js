/**
 * Represents a screen object that manages game screens such as start, win, and game over screens.
 */
class Screen extends DrawableObject {
  /**
   * X-coordinate of the screen.
   * @type {number}
   */
  x = 0;

  /**
   * Y-coordinate of the screen.
   * @type {number}
   */
  y = 0;

  /**
   * Height of the screen.
   * @type {number}
   */
  height = 480;

  /**
   * Width of the screen.
   * @type {number}
   */
  width = 720;

  /**
   * Current index of the enemy in the level array.
   * @type {number}
   */
  i;

  /**
   * Image path for the intro screen.
   * @type {string}
   */
  IMAGE_INTRO = "./img/9_intro_outro_screens/start/startscreen_1.png";

  /**
   * Image path for the game over screen.
   * @type {string}
   */
  IMAGE_GAMEOVER = "./img/9_intro_outro_screens/game_over/oh no you lost!.png";

  /**
   * Image path for the win screen.
   * @type {string}
   */
  IMAGE_WIN = "./img/9_intro_outro_screens/win/win_2.png";

  /**
   * Reference to the game world.
   * @type {World}
   */
  world;

  /**
   * Flag indicating whether the game is at the start screen.
   * @type {boolean}
   */
  startScreen = true;

  /**
   * Flag indicating whether the win screen is active.
   * @type {boolean}
   */
  winScreen = false;

  /**
   * Flag indicating whether the game over screen is active.
   * @type {boolean}
   */
  gameOverScreen = false;

  /**
   * Constructs a new Screen object.
   * @param {HTMLCanvasElement} canvas - The HTML canvas element.
   */
  constructor(canvas) {
    super();
  }

  /**
   * Sets the game world for the screen.
   * @param {World} world - The game world object.
   */
  setWorld(world) {
    this.world = world;
    this.animate();
  }

  /**
   * Triggers the game over event.
   */
  triggerGameOverEvent() {
    const event = new CustomEvent('gameOver', { detail: this });
    window.dispatchEvent(event);
  }

  /**
   * Animates the screen.
   */
  animate() {
    setInterval(() => {
      this.i = this.world.level.enemies.length - 1;
      if (this.gameHasNotStarted()) {
        this.showIntroScreen();
      } else if (this.endbossIsDead()) {
        this.showWinScreen();
        this.triggerGameOverEvent();
      } else if (this.characterIsDead()) {
        this.showGameOverScreen();
        this.triggerGameOverEvent();
      }
    }, 1000 / 60);
  }

  /**
   * Checks if the game has not started (i.e., start screen is active).
   * @returns {boolean} True if the game has not started, false otherwise.
   */
  gameHasNotStarted() {
    return this.startScreen;
  }

  /**
   * Checks if the end boss is dead.
   * @returns {boolean} True if the end boss is dead and death animation is playing, false otherwise.
   */
  endbossIsDead() {
    return (
      this.world.level.enemies[this.i].isDeadAnimationPlaying &&
      !this.startScreen
    );
  }

  /**
   * Checks if the main character is dead.
   * @returns {boolean} True if the main character is dead and death animation is playing, false otherwise.
   */
  characterIsDead() {
    return this.world.character.isDeadAnimationPlaying && !this.startScreen;
  }

  /**
   * Displays the intro screen.
   */
  showIntroScreen() {
    this.loadImage(this.IMAGE_INTRO);
    this.world.ctx.clearRect(
      0,
      0,
      this.world.canvas.width,
      this.world.canvas.height
    );
    this.world.ctx.drawImage(
      this.img,
      0,
      0,
      this.world.canvas.width,
      this.world.canvas.height
    );
  }

  /**
   * Displays the win screen.
   */
  showWinScreen() {
    this.loadImage(this.IMAGE_WIN);
    this.world.ctx.clearRect(
      0,
      0,
      this.world.canvas.width,
      this.world.canvas.height
    );
    this.world.ctx.drawImage(
      this.img,
      0,
      0,
      this.world.canvas.width,
      this.world.canvas.height
    );
    this.winScreen = true;
    // this.reloadPage(); // Uncomment to enable page reload on win screen
  }

  /**
   * Displays the game over screen.
   */
  showGameOverScreen() {
    this.loadImage(this.IMAGE_GAMEOVER);
    this.world.ctx.clearRect(
      0,
      0,
      this.world.canvas.width,
      this.world.canvas.height
    );
    this.world.ctx.drawImage(
      this.img,
      0,
      0,
      this.world.canvas.width,
      this.world.canvas.height
    );
    this.gameOverScreen = true;
    // this.reloadPage(); // Uncomment to enable page reload on game over screen
  }

  /**
   * Reloads the current page after a delay.
   */
  reloadPage() {
    setTimeout(() => {
      this.clearAllIntervals();
      // window.location.reload(); // Uncomment to reload the page
    }, 2000);
  }
}

