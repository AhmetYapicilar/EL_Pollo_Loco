/**
 * Adds touch event listeners to mobile buttons for controlling the game.
 */
function mobileButtons() {
  document
    .getElementById("btnLeft")
    .addEventListener("touchstart", handleBtnLeftTouchStart);
  document
    .getElementById("btnLeft")
    .addEventListener("touchend", handleBtnLeftTouchEnd);
  document
    .getElementById("btnRight")
    .addEventListener("touchstart", handleBtnRightTouchStart);
  document
    .getElementById("btnRight")
    .addEventListener("touchend", handleBtnRightTouchEnd);
  document
    .getElementById("btnJump")
    .addEventListener("touchstart", handleBtnJumpTouchStart);
  document
    .getElementById("btnJump")
    .addEventListener("touchend", handleBtnJumpTouchEnd);
  document
    .getElementById("btnThrow")
    .addEventListener("touchstart", handleBtnThrowTouchStart);
  document
    .getElementById("btnThrow")
    .addEventListener("touchend", handleBtnThrowTouchEnd);
}

/**
 * Handles the touch start event for the left button, setting the LEFT key state to true.
 *
 * @param {TouchEvent} e - The touch event.
 */
function handleBtnLeftTouchStart(e) {
  e.preventDefault();
  keyboard.LEFT = true;
}

/**
 * Handles the touch end event for the left button, setting the LEFT key state to false.
 *
 * @param {TouchEvent} e - The touch event.
 */
function handleBtnLeftTouchEnd(e) {
  e.preventDefault();
  keyboard.LEFT = false;
}

/**
 * Handles the touch start event for the right button, setting the RIGHT key state to true.
 *
 * @param {TouchEvent} e - The touch event.
 */
function handleBtnRightTouchStart(e) {
  e.preventDefault();
  keyboard.RIGHT = true;
}

/**
 * Handles the touch end event for the right button, setting the RIGHT key state to false.
 *
 * @param {TouchEvent} e - The touch event.
 */
function handleBtnRightTouchEnd(e) {
  e.preventDefault();
  keyboard.RIGHT = false;
}

/**
 * Handles the touch start event for the jump button, setting the SPACE key state to true.
 *
 * @param {TouchEvent} e - The touch event.
 */
function handleBtnJumpTouchStart(e) {
  e.preventDefault();
  keyboard.SPACE = true;
}

/**
 * Handles the touch end event for the jump button, setting the SPACE key state to false.
 *
 * @param {TouchEvent} e - The touch event.
 */
function handleBtnJumpTouchEnd(e) {
  e.preventDefault();
  keyboard.SPACE = false;
}

/**
 * Handles the touch start event for the throw button, setting the D key state to true.
 *
 * @param {TouchEvent} e - The touch event.
 */
function handleBtnThrowTouchStart(e) {
  e.preventDefault();
  keyboard.D = true;
}

/**
 * Handles the touch end event for the throw button, setting the D key state to false.
 *
 * @param {TouchEvent} e - The touch event.
 */
function handleBtnThrowTouchEnd(e) {
  e.preventDefault();
  keyboard.D = false;
}

/**
 * Handles the key down event, updating the keyboard state based on the pressed key.
 *
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleKeyDown(e) {
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
}

/**
 * Handles the key up event, updating the keyboard state based on the released key.
 *
 * @param {KeyboardEvent} e - The keyboard event.
 */
function handleKeyUp(e) {
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
}

/**
 * Checks whether device is Mobile.
 */
function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

/**
 * Checks whether the device is a Tablet.
 */
function isTablet() {
  const regex = /iPad|Android/i;
  const isIPad =
    navigator.userAgent.includes("iPad") ||
    (navigator.userAgent.includes("Macintosh") && "ontouchend" in document);
  return regex.test(navigator.userAgent) || isIPad;
}

/**
 * The screens gets the same height and width as the canvas.
 */
function adjustDimensions() {
  const canvas = document.querySelector("canvas");
  const screens = document.querySelectorAll(".screen, .settings-screen");

  if (canvas) {
    const canvasHeight = canvas.offsetHeight;
    const canvasWidth = canvas.offsetWidth;

    screens.forEach((screen) => {
      screen.style.height = `${canvasHeight}px`;
      screen.style.width = `${canvasWidth}px`;
    });
  }

  requestAnimationFrame(adjustDimensions);
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
