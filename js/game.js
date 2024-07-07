let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let soundMuted;
let playAgain = false;
let fullsize = false;
let settings = false;

/**
 * Initializes the game by setting up the canvas, world, and event listeners.
 */
function init() {
  setBackground();
  canvas = document.getElementById("canvas");
  generateCSSForNormalscreen();
  world = new World(canvas, keyboard);
  soundMuted = getLocalStorage("soundMuted") || false;
  loadAudioWhenInit();
  mobileButtons();
  handleResize(); // Check the initial state
  intervalForSizeOfScreens();
  window.addEventListener("resize", handleResize);
}

/**
 * Resets all game variables and canvas, then reinitializes the world.
 */
function resetEverything() {
  clearAllIntervals();
  world.resetVariables();
  world = null;
  setBackground();
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  world = new World(canvas, keyboard);
  intervalForSizeOfScreens();
}

/**
 * Starts the game. If playAgain is true, it restarts the game, otherwise starts it for the first time.
 * Displays mobile buttons if the screen width is less than 800 and in landscape mode.
 * Plays background music and hides certain elements during the game.
 */
function startGame() {
  if (playAgain) {
    restartGame();
  } else {
    firstStartGame();
  }
  if (isMobile() || isTablet()) {
    document.getElementById("mobileButtons").style.display = "flex";
  }
  world.playBackgroundMusic();
  hideElementsInGame();
}

/**
 * Hides various elements in the game by setting their display style to 'none'.
 */
function hideElementsInGame() {
  document.getElementById("startButton").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("screen").style.display = "none";
}

/**
 * Starts the game for the first time, setting playAgain to true, updating the world screen,
 * drawing the world, setting up mobile buttons, and adding a resize event listener.
 */
function firstStartGame() {
  playAgain = true;
  world.screen.startScreen = false;
  world.draw();
  mobileButtons();
  handleResize(); // Check the initial state
  window.addEventListener("resize", handleResize);
}

/**
 * Restarts the game by resetting all variables, reinitializing the world,
 * loading audio settings, and redrawing the world.
 */
function restartGame() {
  resetEverything();
  soundMuted = getLocalStorage("soundMuted") || false;
  loadAudioWhenInit();
  world.screen.startScreen = false;
  world.drawAgain();
}

/**
 * Loads audio settings during initialization, muting or unmuting the world's music based on saved preferences.
 */
function loadAudioWhenInit() {
  if (soundMuted) {
    document.getElementById("mute-audio-icon").classList.remove("d-none");
    document.getElementById("audio-icon").classList.add("d-none");
    world.bgMusic.muted = true;
    muteAudios(true);
  } else {
    document.getElementById("mute-audio-icon").classList.add("d-none");
    document.getElementById("audio-icon").classList.remove("d-none");
    world.bgMusic.muted = false;
    muteAudios(false);
  }
}

/**
 * Toggles the audio state between muted and unmuted, updates the audio icon visibility,
 * and saves the new audio state to local storage.
 */
function toggleAudio() {
  document.getElementById("audio-icon").classList.toggle("d-none");
  document.getElementById("mute-audio-icon").classList.toggle("d-none");
  if (
    !document.getElementById("mute-audio-icon").classList.contains("d-none")
  ) {
    world.bgMusic.muted = true;
    muteAudios(true);
  } else {
    world.bgMusic.muted = false;
    muteAudios(false);
  }
  saveToLocalStorage("soundMuted", world.bgMusic.muted);
}

/**
 * Mute all Audios if x is true.
 * @param {variable is true or false} x
 */
function muteAudios(x) {
  world.game_over.muted = x;
  world.character.walking_sound.muted = x;
  world.character.jumping_sound.muted = x;
  world.character.hurt_sound.muted = x;
  getChickens(x);
  getCoins(x);
  world.muteBottleSounds = x;
  world.game_over.muted = x;
}

/**
 * Gets all Chickens and mute or unmute their sounds.
 * @param {variable is true or false} x
 */
function getChickens(x) {
  for (let i = 0; i < world.level.enemies.length - 1; i++) {
    const enemy = world.level.enemies[i];
    enemy.DEATH_SOUND.muted = x;
  }
  let j = world.level.enemies.length - 1;
  world.level.enemies[j].winSound.muted = x;
}

/**
 * Gets all Coins and mute or unmute their sounds.
 * @param {variable is true or false} x
 */
function getCoins(x) {
  world.coins.forEach((coin) => {
    coin.COIN_SOUND.muted = x;
  });
}

/**
 * Sets the background based on the current screen state.
 */
function setBackground() {
  setInterval(() => {
    if (world.screen.startScreen && !settings) {
      showIntro();
    } else if (world.screen.winScreen && !settings) {
      document.getElementById("screen").style.display = "flex";
      showWinScreen();
      handleGameOver();
    } else if (world.screen.gameOverScreen && !settings) {
      document.getElementById("screen").style.display = "flex";
      showGameoverScreen();
      handleGameOver();
    }
  }, 200);
}

/**
 * Shows the intro screen by setting the background and updating the screen state.
 */
function showIntro() {
  world.screen.startScreen = true;
  world.screen.winScreen = false;
  world.screen.gameOverScreen = false;
  const screenElement = document.getElementById("screen");
  document.getElementById("backToMenu").style.display = "none";
  document.getElementById("settings").style.display = "flex";
  document.getElementById("fullscreen").style.display = "flex";
  document.getElementById("icons").style.zIndex = 30;
  removeImages(screenElement);
  newImage(
    "./img/9_intro_outro_screens/start/startscreen_1.png",
    screenElement,
    100,
    100
  );
}

/**
 * Removes all img elements from the given screen element.
 * @param {HTMLElement} screenElement - The element from which images will be removed.
 */
function removeImages(screenElement) {
  const images = screenElement.querySelectorAll("img");
  images.forEach((img) => {
    if (img.parentNode === screenElement) {
      screenElement.removeChild(img);
    }
  });
}

/**
 * Shows the win screen by setting the background and updating the screen state.
 */
function showWinScreen() {
  world.screen.startScreen = false;
  world.screen.winScreen = true;
  world.screen.gameOverScreen = false;
  const screenElement = document.getElementById("screen");
  removeImages(screenElement);

  // Entferne vorhandene Kinder (optional, falls nur ein Bild angezeigt werden soll)
  /* while (screenElement.firstChild) {
    screenElement.removeChild(screenElement.firstChild);
  }*/
  newImage("./img/9_intro_outro_screens/win/win_1.png", screenElement, 50, 50);
}

/**
 * Shows the game over screen by setting the background and updating the screen state.
 */
function showGameoverScreen() {
  world.screen.startScreen = false;
  world.screen.winScreen = false;
  world.screen.gameOverScreen = true;
  const screenElement = document.getElementById("screen");
  removeImages(screenElement);
  // Entferne vorhandene Kinder (optional, falls nur ein Bild angezeigt werden soll)
  /* while (screenElement.firstChild) {
    screenElement.removeChild(screenElement.firstChild);
  }*/
  newImage(
    "./img/9_intro_outro_screens/game_over/game over!.png",
    screenElement,
    50,
    50
  );
}

/**
 * Creates a new image element and appends it to the given screen element.
 * @param {string} path - The path to the image file.
 * @param {HTMLElement} screenElement - The element to which the image will be appended.
 * @param {number} width - The width of the image as a percentage of the screen element's width.
 * @param {number} height - The height of the image as a percentage of the screen element's height.
 */
function newImage(path, screenElement, width, height) {
  // Erstelle ein neues img-Element
  const imgElement = document.createElement("img");
  imgElement.src = path;
  imgElement.style.width = `${width}%`; // Beispiel: Das Bild wird über die gesamte Breite des screen-Elements skaliert
  imgElement.style.height = `${height}%`;
  imgElement.style.position = "absolute";
  imgElement.style.top = "50%";
  imgElement.style.left = "50%";
  imgElement.style.transform = "translate(-50%, -50%)"; // Zentriert das Bild

  // Füge das img-Element als Kind des screen-Elements hinzu
  screenElement.appendChild(imgElement);
}

/**
 * Clears all active intervals by iterating through a large range of possible interval IDs.
 */
function clearAllIntervals() {
  for (let i = 0; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * Handles the game over state by displaying the appropriate UI elements and hiding others.
 */
function handleGameOver() {
  document.getElementById("screen").style.display = "flex";
  document.getElementById("startButton").style.display = "block";
  document.getElementById("screen").style.zIndex = "10";
  document.getElementById("startButton").innerHTML = "Play Again !!";
  document.getElementById("title").style.display = "block";
  document.getElementById("backToMenu").style.display = "block";
  document.getElementById("settings").style.display = "none";
  document.getElementById("fullscreen").style.display = "none";
  document.getElementById("mobileButtons").style.display = "none";
}

/**
 * Saves a value to local storage under the specified key.
 *
 * @param {string} key - The key under which the value should be stored.
 * @param {any} value - The value to be stored.
 */
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves a value from local storage by its key.
 *
 * @param {string} key - The key of the value to be retrieved.
 * @returns {any} The retrieved value parsed from JSON.
 */
function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
