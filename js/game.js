let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let soundMuted;
let playAgain = false;
let fullsize = false;

/**
 * Initializes the game by setting up the canvas, world, and event listeners.
 */
function init() {
  canvas = document.getElementById("canvas");
  generateCSSForNormalscreen();
  world = new World(canvas, keyboard);
  soundMuted = getLocalStorage("soundMuted") || false;
  loadAudioWhenInit();
  mobileButtons();
  handleResize(); // Check the initial state
  intervalForSizeOfScreens();
  window.addEventListener("resize", handleResize);
  window.addEventListener("gameOver", handleGameOver);
}

/**
 * Resets all game variables and canvas, then reinitializes the world.
 */
function resetEverything() {
  clearAllIntervals();
  world.resetVariables();
  world = null;
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
function muteAudios(x){
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
function getChickens(x){
  for (let i = 0; i < world.level.enemies.length - 1; i++) {
    const enemy = world.level.enemies[i];
    enemy.DEATH_SOUND.muted = x;
  };
  let j = world.level.enemies.length - 1;
  world.level.enemies[j].winSound.muted = x;
}

/**
 * Gets all Coins and mute or unmute their sounds.
 * @param {variable is true or false} x 
 */
function getCoins(x){
  world.coins.forEach(coin => {
    coin.COIN_SOUND.muted = x;
  });
}

/**
 * Resets the game and shows the introduction screen, setting the appropriate elements' display styles
 * and updating the start button text.
 */
function showIntro() {
  resetEverything();
  world.screen.startScreen = true;
  document.getElementById("backToMenu").style.display = "none";
  document.getElementById("settings").style.display = "block";
  document.getElementById("fullscreen").style.display = "block";
  document.getElementById("startButton").innerHTML = "Start Game";
  document.getElementById("settings-screen").style.display = "flex";
  document.getElementById("mobileButtons").style.display = "none";
  document.getElementById("mobileButtons").style.display = "none";
  closeSettings();
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
 * Toggles the fullscreen mode by invoking the toggleFullscreen function with the appropriate element.
 */
function showFullscreen() {
  let fullscreen = document.getElementById("showInFullscreen");
  toggleFullscreen(fullscreen);
}

/**
 * Toggles fullscreen mode for a given element, exiting fullscreen if already in fullscreen mode,
 * or entering fullscreen if not. Adjusts CSS and event listeners accordingly.
 *
 * @param {HTMLElement} fullscreenElement - The element to toggle fullscreen mode on.
 */
function toggleFullscreen(fullscreenElement) {
  if (document.fullscreenElement) {
    exitFullscreen(fullscreenElement);
    handleResize(); // Check the initial state
    window.addEventListener("resize", handleResize);
    generateCSSForNormalscreen();
  } else {
    enterFullscreen(fullscreenElement);
    generateCSSForFullscreen();
  }
}

/**
 * Generates the appropriate CSS for fullscreen mode based on the screen dimensions.
 */
function generateCSSForFullscreen() {
  fullsize = true;
  if (!isMobile()) {
    fullscreenForLaptop();
  } else {
    fullscreenForMobile();
  }
  adjustDimensions();
}

/**
 * Generates the appropriate CSS for normal screen mode based on the screen dimensions.
 */
function generateCSSForNormalscreen() {
  fullsize = false;
  if (!isMobile() && !isTablet()) {
    normalScreenForLaptop();
  } else if(isMobile() || isTablet()) {
    normalScreenForMobile();
  } 
  adjustDimensions();
}

/**
 * Sets the CSS for normal screen mode on mobile devices, adjusting various elements' styles.
 */
function normalScreenForMobile() {
  if(innerWidth > 720){
    document.getElementById("canvas").style.width = "720px";
  } else{
    document.getElementById("canvas").style.width = "90vw";
  }
    if(innerHeight > 480){
    document.getElementById("canvas").style.height = "480px";
    } else {
      document.getElementById("canvas").style.height = "90vh";
    }
}

/**
 * Sets the CSS for normal screen mode on laptops, adjusting various elements' styles.
 */
function normalScreenForLaptop() {
  if(innerWidth > 720){
    document.getElementById("canvas").style.width = "720px";
  } else{
    document.getElementById("canvas").style.width = "90vw";
  } if(innerHeight > 480){
    document.getElementById("canvas").style.height = "480px";
    } else {
      document.getElementById("canvas").style.height = "90vh";
    }
}

/**
 * Interval which checks every 200ms the size of the screen and optimize the size of the canvas.
 */
function intervalForSizeOfScreens(){
  setInterval(() => {
    if(!fullsize){
      generateCSSForNormalscreen();
    }
  }, 200);
}

/**
 * Sets the CSS for fullscreen mode on laptops, adjusting various elements' styles to fill the screen.
 */
function fullscreenForLaptop() {
  document.getElementById("canvas").style.width = "100%";
  document.getElementById("canvas").style.height = "100%";
  document.getElementById("screen-bottom").style.right = "0px";
}

/**
 * Sets the CSS for fullscreen mode on mobile devices, adjusting various elements' styles to fill the screen.
 */
function fullscreenForMobile() {
  document.getElementById("canvas").style.width = "100vw";
  document.getElementById("canvas").style.height = "100vh";
  document.getElementById("screen-bottom").style.right = "0px";
  document.getElementById("mobileButtons").style.position = "absolute";
  document.getElementById("mobileButtons").style.bottom = "0";
}

/**
 * Requests the browser to make the specified element fullscreen.
 *
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits the fullscreen mode if the browser is currently in fullscreen.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
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

/**
 * Opens the settings screen by hiding other screens and displaying the settings screen.
 */
function openSettings() {
  document.getElementById("screen").style.display = "none";
  document.getElementById("screen-bottom").style.display = "none";
  document.getElementById("screen").style.display = "none";
  document.getElementById("settings-screen").style.display = "flex";
  document.getElementById("mobileButtons").style.display = "none";
}

/**
 * Closes the settings screen and returns to the main screen, displaying relevant elements.
 */
function closeSettings() {
  document.getElementById("screen").style.display = "flex";
  document.getElementById("settings-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("startButton").style.display = "block";
  document.getElementById("title").style.display = "block";
  document.getElementById("screen").style.display = "flex";
  document.getElementById("screen-bottom").style.display = "flex";
}

/**
 * Handles window resize events, adjusting the display of certain elements based on screen dimensions.
 */
function handleResize() {
  if (isMobile() && window.innerHeight > window.innerWidth) {
    justShowTurnDevice();
  } else {
    justHideTurnDevice();
  }
  if (!isMobile()) {
    document.getElementById("mobileButtons").style.display = "none";
  } else if (
    world.screen.startScreen &&
    isMobile()
  ) {
    document.getElementById("mobileButtons").style.display = "none";
  }
}

/**
 * Shows the "turn device" screen and hides other elements, indicating that the device should be rotated.
 */
function justShowTurnDevice() {
  document.getElementById("turnDeviceScreen").style.display = "flex";
  document.getElementById("canvas").style.display = "none";
  document.getElementById("mobileButtons").style.display = "none";
  document.getElementById("startButton").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("screen").style.display = "none";
  document.getElementById("settings-screen").style.display = "none";
  document.getElementById("screen-bottom").style.display = "none";
}

/**
 * Hides the "turn device" screen and shows other game elements, indicating that the device is in the correct orientation.
 */
function justHideTurnDevice() {
  document.getElementById("turnDeviceScreen").style.display = "none";
  document.getElementById("canvas").style.display = "block";
  document.getElementById("mobileButtons").style.display = "flex";
  document.getElementById("startButton").style.display = "block";
  document.getElementById("title").style.display = "block";
  document.getElementById("screen").style.display = "flex";
  document.getElementById("screen-bottom").style.display = "flex";
}

