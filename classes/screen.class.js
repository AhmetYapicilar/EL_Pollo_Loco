class Screen extends DrawableObject {
  x = 0;
  y = 0;
  height = 480;
  width = 720;
  i;
  IMAGE_INTRO = "./img/9_intro_outro_screens/start/startscreen_1.png";
  IMAGE_GAMEOVER = "./img/9_intro_outro_screens/game_over/game over!.png";
  IMAGE_WIN = "./img/9_intro_outro_screens/win/win_2.png";
  world;
  startScreen = true;

  constructor(canvas) {
    super();
  }

  setWorld(world) {
    this.world = world;

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.i = this.world.level.enemies.length - 1;
      if (this.gameHasNotStarted()) {
        this.showIntroScreen();
      } else if (this.endbossIsDead()) {
        this.showWinScreen();
      } else if (this.characterIsDead()) {
        this.showGameOverScreen();
      }
    }, 1000 / 60);
  }

  gameHasNotStarted() {
    return this.startScreen;
  }

  endbossIsDead() {
    return (
      this.world.level.enemies[this.i].isDeadAnimationPlaying &&
      !this.startScreen
    );
  }

  characterIsDead() {
    return this.world.character.isDeadAnimationPlaying && !this.startScreen;
  }

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
    this.reloadPage();
  }

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
    this.reloadPage();
  }

  reloadPage() {
    setTimeout(() => {
      this.clearAllIntervals();
      window.location.reload();
    }, 2000);
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
      window.clearInterval(i);
    }
  }
}
