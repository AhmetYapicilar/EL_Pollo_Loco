let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let soundMuted;
let playAgain = false;

/**
 * Initializes the game by setting up the canvas, world, and event listeners.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  soundMuted = getLocalStorage("soundMuted") || false;
  loadAudioWhenInit();
  mobileButtons();
  handleResize(); // Check the initial state
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
  if (window.innerWidth < 800 && !(window.innerHeight > window.innerWidth)) {
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
  document.getElementById("screen-bottom").style.display = "none";
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
    world.musicMuted = true;
  } else {
    world.musicMuted = false;
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
  } else {
    world.bgMusic.muted = false;
  }
  saveToLocalStorage("soundMuted", world.bgMusic.muted);
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
  if (innerWidth > 720 && innerHeight > 480) {
    fullscreenForLaptop();
  } else {
    fullscreenForMobile();
  }
}

/**
 * Generates the appropriate CSS for normal screen mode based on the screen dimensions.
 */
function generateCSSForNormalscreen() {
  if (innerWidth > 720 && innerHeight > 480) {
    normalScreenForLaptop();
  } else {
    normalScreenForMobile();
  }
}

/**
 * Sets the CSS for normal screen mode on mobile devices, adjusting various elements' styles.
 */
function normalScreenForMobile() {
  givingElements100percent();
  document.querySelector(".impressum").style.position = "absolute";
  document.querySelector(".impressum").style.bottom = "0";
  document.querySelector(".impressum").style.right = "10px";
  document.getElementById("mobileButtons").style.position = "absolute";
  document.getElementById("mobileButtons").style.bottom = "56px";
  document.getElementById("screen-bottom").style.bottom = "30px";
}

/**
 * Sets the width and height of various elements to 100% to ensure they occupy the full viewport.
 */
function givingElements100percent() {
  document.getElementById("body").style.width = "100vw";
  document.getElementById("body").style.height = "100vh";
  document.getElementById("showInFullscreen").style.width = "100%";
  document.getElementById("showInFullscreen").style.height = "100%";
  document.getElementById("canvas").style.width = "100%";
  document.getElementById("canvas").style.height = "90%";
  document.getElementById("screen").style.width = "100%";
  document.getElementById("screen").style.height = "90%";
  document.getElementById("settings-screen").style.width = "100%";
  document.getElementById("settings-screen").style.height = "100%";
}

/**
 * Sets the CSS for normal screen mode on laptops, adjusting various elements' styles.
 */
function normalScreenForLaptop() {
  document.getElementById("showInFullscreen").style.position = "relative";
  document.getElementById("showInFullscreen").style.display = "flex";
  document.getElementById("canvas").style.width = "720px";
  document.getElementById("canvas").style.height = "480px";
  document.getElementById("screen").style.width = "720px";
  document.getElementById("screen").style.height = "480px";
  document.getElementById("settings-screen").style.width = "720px";
  document.getElementById("settings-screen").style.height = "480px";
  document.getElementById("screen-bottom").style.right = "10px";
}

/**
 * Sets the CSS for fullscreen mode on laptops, adjusting various elements' styles to fill the screen.
 */
function fullscreenForLaptop() {
  document.getElementById("showInFullscreen").style.position = "absolute";
  document.getElementById("showInFullscreen").style.top = "0";
  document.getElementById("showInFullscreen").style.left = "0";
  document.getElementById("showInFullscreen").style.right = "0";
  document.getElementById("showInFullscreen").style.bottom = "0";
  document.getElementById("canvas").style.width = "100vw";
  document.getElementById("canvas").style.height = "100vh";
  document.getElementById("screen").style.width = "100vw";
  document.getElementById("screen").style.height = "100vh";
  document.getElementById("settings-screen").style.width = "100vw";
  document.getElementById("settings-screen").style.height = "100vh";
  document.getElementById("screen-bottom").style.right = "0px";
}

/**
 * Sets the CSS for fullscreen mode on mobile devices, adjusting various elements' styles to fill the screen.
 */
function fullscreenForMobile() {
  document.getElementById("showInFullscreen").style.width = "100%";
  document.getElementById("showInFullscreen").style.height = "100%";
  document.getElementById("canvas").style.width = "100vw";
  document.getElementById("canvas").style.height = "100vh";
  document.getElementById("screen").style.width = "100vw";
  document.getElementById("screen").style.height = "100vh";
  document.getElementById("settings-screen").style.width = "100vw";
  document.getElementById("settings-screen").style.height = "100vh";
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
  if (window.innerWidth < 800 && window.innerHeight > window.innerWidth) {
    justShowTurnDevice();
  } else {
    justHideTurnDevice();
  }
  if (window.innerWidth > 800) {
    document.getElementById("mobileButtons").style.display = "none";
  } else if (
    world.screen.startScreen &&
    window.innerWidth < 800 &&
    !(window.innerHeight > window.innerWidth)
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

