let fullsize = false;

/**
 * Opens the settings screen by hiding other screens and displaying the settings screen.
 */
function openSettings() {
  settings = true;
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
  settings = false;
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
  } else if (isTablet() && window.innerHeight > window.innerWidth){
    justShowTurnDevice();
  } else {
    justHideTurnDevice();
  }
  if (!isMobile() || !isTablet()) {
    document.getElementById("mobileButtons").style.display = "none";
  } else if (world.screen.startScreen && isMobile() || world.screen.startScreen && isTablet()) {
    document.getElementById("mobileButtons").style.display = "none";
  }
}

/**
 * Event Listener to check whether device is in portrait modus or not.
 */
window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
  const portrait = e.matches;

  if (portrait && world.screen.startScreen) {
    document.getElementById("mobileButtons").style.display = "none";
  } else if (!portrait && !world.screen.startScreen) {
    document.getElementById("mobileButtons").style.display = "flex";
  }
});
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
  } else if (isMobile() || isTablet()) {
    normalScreenForMobile();
  }
  adjustDimensions();
}

/**
 * Sets the CSS for normal screen mode on mobile devices, adjusting various elements' styles.
 */
function normalScreenForMobile() {
  if (innerWidth > 720) {
    document.getElementById("canvas").style.width = "720px";
  } else {
    document.getElementById("canvas").style.width = "90vw";
  }
  if (innerHeight > 480) {
    document.getElementById("canvas").style.height = "480px";
  } else {
    document.getElementById("canvas").style.height = "90vh";
  }
}

/**
 * Sets the CSS for normal screen mode on laptops, adjusting various elements' styles.
 */
function normalScreenForLaptop() {
  if (innerWidth > 720) {
    document.getElementById("canvas").style.width = "720px";
  } else {
    document.getElementById("canvas").style.width = "90vw";
  }
  if (innerHeight > 480) {
    document.getElementById("canvas").style.height = "480px";
  } else {
    document.getElementById("canvas").style.height = "90vh";
  }
}

/**
 * Interval which checks every 200ms the size of the screen and optimize the size of the canvas.
 */
function intervalForSizeOfScreens() {
  setInterval(() => {
    if (!fullsize) {
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
  document.getElementById("mobileButtons").style.zIndex = "";
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
