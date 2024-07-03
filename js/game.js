let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let soundMuted;
let playAgain = false;


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    soundMuted = getLocalStorage('soundMuted') || false;
    loadAudioWhenInit();
    mobileButtons();
    handleResize(); // Check the initial state
    window.addEventListener('resize', handleResize);
    window.addEventListener('gameOver', handleGameOver);
}

function resetEverything(){
  clearAllIntervals();
    world.resetVariables();
    world = null;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
    world = new World(canvas, keyboard, playAgain);
}

function startGame() {
  if(playAgain){
    resetEverything();
    soundMuted = getLocalStorage('soundMuted') || false;
    loadAudioWhenInit();
    world.screen.startScreen = false;
    world.drawAgain();
  } else {
  playAgain = true;
    world.screen.startScreen = false;
    world.draw();
    mobileButtons();
    handleResize(); // Check the initial state
    window.addEventListener('resize', handleResize);
}
if(innerWidth < 720 || innerHeight < 480){
  document.getElementById('mobileButtons').style.display = "flex";
}
world.playBackgroundMusic();
document.getElementById("startButton").style.display = "none";
document.getElementById("title").style.display = "none";
document.getElementById('screen').style.display = 'none';
document.getElementById('screen-bottom').style.display = 'none';
}

function loadAudioWhenInit(){
  if(soundMuted){
    world.musicMuted = true;
  } else {
    world.musicMuted = false;
  }
}

function toggleAudio(){
    document.getElementById('audio-icon').classList.toggle('d-none');
    document.getElementById('mute-audio-icon').classList.toggle('d-none');
    if(!document.getElementById('mute-audio-icon').classList.contains('d-none')){
      world.bgMusic.muted = true;
    } else{
      world.bgMusic.muted = false;
    }
    saveToLocalStorage('soundMuted', world.bgMusic.muted);
}

function showIntro(){
 resetEverything();
  world.screen.startScreen = true;
  document.getElementById('backToMenu').style.display = 'none';
  document.getElementById('settings').style.display = 'block';
  document.getElementById('fullscreen').style.display = 'block';
  document.getElementById('startButton').innerHTML = 'Start Game';
  document.getElementById('settings-screen').style.display = 'flex';
  document.getElementById('mobileButtons').style.display = "none";
  closeSettings();
}

function clearAllIntervals() {
  for (let i = 0; i < 9999; i++) {
    window.clearInterval(i);
  }
}

function handleGameOver() {
  document.getElementById('screen').style.display = 'flex';
  document.getElementById("startButton").style.display = "block";
  document.getElementById('screen').style.zIndex = '10';
  document.getElementById('startButton').innerHTML = 'Play Again !!';
  document.getElementById("title").style.display = "block";
  document.getElementById('backToMenu').style.display = 'block';
  document.getElementById('settings').style.display = 'none';
  document.getElementById('fullscreen').style.display = 'none';
  document.getElementById('mobileButtons').style.display = "none";
}

function showFullscreen(){
    let fullscreen = document.getElementById('showInFullscreen');
    toggleFullscreen(fullscreen);
}

function toggleFullscreen(fullscreenElement){
  if(document.fullscreenElement){
    exitFullscreen(fullscreenElement);
    handleResize(); // Check the initial state
    window.addEventListener('resize', handleResize);
    generateCSSForNormalscreen();
  } else {
    enterFullscreen(fullscreenElement);
    generateCSSForFullscreen();
  }
}

function generateCSSForFullscreen(){
  if(innerWidth > 720 && innerHeight > 480){
   fullscreenForLaptop();
} else {
  fullscreenForMobile();
}
}

function generateCSSForNormalscreen(){
  if(innerWidth > 720 && innerHeight > 480){
  normalScreenForLaptop();
} else {
  normalScreenForMobile();
}
}

function normalScreenForMobile(){
  document.getElementById('body').style.width = "100vw";
  document.getElementById('body').style.height = "100vh";
  document.getElementById('showInFullscreen').style.width = "100%";
  document.getElementById('showInFullscreen').style.height = "100%";
  document.getElementById('canvas').style.width = '100%';
  document.getElementById('canvas').style.height = '90%';
  document.getElementById('screen').style.width = '100%';
  document.getElementById('screen').style.height = '90%';
  document.getElementById('settings-screen').style.width = '100%';
  document.getElementById('settings-screen').style.height = '100%';
  document.querySelector('impressum').style.position = "absolute";
  document.querySelector('impressum').style.bottom = "0";
  document.querySelector('impressum').style.right = "10px";
  document.getElementById('mobileButtons').style.position = "absolute";
  document.getElementById('mobileButtons').style.bottom = "30px";
}

function normalScreenForLaptop(){
  document.getElementById('showInFullscreen').style.position = "relative";
  document.getElementById('showInFullscreen').style.display = "flex";
  document.getElementById('canvas').style.width = '720px';
  document.getElementById('canvas').style.height = '480px';
  document.getElementById('screen').style.width = '720px';
  document.getElementById('screen').style.height = '480px';
  document.getElementById('settings-screen').style.width = '720px';
  document.getElementById('settings-screen').style.height = '480px';
  document.getElementById('screen-bottom').style.right = '10px';
}

function fullscreenForLaptop(){
  document.getElementById('showInFullscreen').style.position = "absolute";
  document.getElementById('showInFullscreen').style.top = "0";
  document.getElementById('showInFullscreen').style.left = "0";
  document.getElementById('showInFullscreen').style.right = "0";
  document.getElementById('showInFullscreen').style.bottom = "0";
  document.getElementById('canvas').style.width = '100vw';
  document.getElementById('canvas').style.height = '100vh';
  document.getElementById('screen').style.width = '100vw';
  document.getElementById('screen').style.height = '100vh';
  document.getElementById('settings-screen').style.width = '100vw';
  document.getElementById('settings-screen').style.height = '100vh';
  document.getElementById('screen-bottom').style.right = '0px';
}

function fullscreenForMobile(){
  document.getElementById('showInFullscreen').style.width = '100%';
  document.getElementById('showInFullscreen').style.height = '100%';
  document.getElementById('canvas').style.width = '100vw';
    document.getElementById('canvas').style.height = '100vh';
    document.getElementById('screen').style.width = '100vw';
    document.getElementById('screen').style.height = '100vh';
    document.getElementById('settings-screen').style.width = '100vw';
    document.getElementById('settings-screen').style.height = '100vh';
    document.getElementById('screen-bottom').style.right = '0px';
    document.getElementById('mobileButtons').style.position = "absolute";
    document.getElementById('mobileButtons').style.bottom = "0";
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
  }

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

function saveToLocalStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key){
  return JSON.parse(localStorage.getItem(key));
}

function openSettings(){
    document.getElementById('screen').style.display = 'none';
    document.getElementById('screen-bottom').style.display = 'none';
    document.getElementById('screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'flex';
    document.getElementById('mobileButtons').style.display = 'none';
}

function closeSettings(){
  document.getElementById('screen').style.display = 'flex';
    document.getElementById('settings-screen').style.display = 'none';
        document.getElementById('canvas').style.display = 'block';
        document.getElementById('startButton').style.display = 'block';
        document.getElementById('title').style.display = 'block';
        document.getElementById('screen').style.display = 'flex';
        document.getElementById('screen-bottom').style.display = 'flex';
        document.getElementById('mobileButtons').style.display = 'flex';
}

function handleResize() {
    if (window.innerWidth < 800 && window.innerHeight > window.innerWidth) {
        justShowTurnDevice();
    } else {
        justHideTurnDevice();
    }
    if (window.innerWidth > 800) {
        document.getElementById('mobileButtons').style.display = 'none';
    } else if (world.screen.startScreen && window.innerWidth < 800 && !(window.innerHeight > window.innerWidth)) {
        document.getElementById('mobileButtons').style.display = 'none';
    }
}

function justShowTurnDevice(){
    document.getElementById('turnDeviceScreen').style.display = 'flex';
        document.getElementById('canvas').style.display = 'none';
        document.getElementById('mobileButtons').style.display = 'none';
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('title').style.display = 'none';
        document.getElementById('screen').style.display = 'none';
        document.getElementById('settings-screen').style.display = 'none';
        document.getElementById('screen-bottom').style.display = 'none';
}

function justHideTurnDevice(){
    document.getElementById('turnDeviceScreen').style.display = 'none';
        document.getElementById('canvas').style.display = 'block';
        document.getElementById('mobileButtons').style.display = 'flex';
        document.getElementById('startButton').style.display = 'block';
        document.getElementById('title').style.display = 'block';
        document.getElementById('screen').style.display = 'flex';
        document.getElementById('screen-bottom').style.display = 'flex';
}

function mobileButtons() {
  document.getElementById("btnLeft").addEventListener("touchstart", handleBtnLeftTouchStart);
  document.getElementById("btnLeft").addEventListener("touchend", handleBtnLeftTouchEnd);
  document.getElementById("btnRight").addEventListener("touchstart", handleBtnRightTouchStart);
  document.getElementById("btnRight").addEventListener("touchend", handleBtnRightTouchEnd);
  document.getElementById("btnJump").addEventListener("touchstart", handleBtnJumpTouchStart);
  document.getElementById("btnJump").addEventListener("touchend", handleBtnJumpTouchEnd);
  document.getElementById("btnThrow").addEventListener("touchstart", handleBtnThrowTouchStart);
  document.getElementById("btnThrow").addEventListener("touchend", handleBtnThrowTouchEnd);
}

function handleBtnLeftTouchStart(e) {
  e.preventDefault();
  keyboard.LEFT = true;
}

function handleBtnLeftTouchEnd(e) {
  e.preventDefault();
  keyboard.LEFT = false;
}

function handleBtnRightTouchStart(e) {
  e.preventDefault();
  keyboard.RIGHT = true;
}

function handleBtnRightTouchEnd(e) {
  e.preventDefault();
  keyboard.RIGHT = false;
}

function handleBtnJumpTouchStart(e) {
  e.preventDefault();
  keyboard.SPACE = true;
}

function handleBtnJumpTouchEnd(e) {
  e.preventDefault();
  keyboard.SPACE = false;
}

function handleBtnThrowTouchStart(e) {
  e.preventDefault();
  keyboard.D = true;
}

function handleBtnThrowTouchEnd(e) {
  e.preventDefault();
  keyboard.D = false;
}

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

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

function removeEventListeners() {
  document.getElementById("btnLeft").removeEventListener("touchstart", handleBtnLeftTouchStart);
  document.getElementById("btnLeft").removeEventListener("touchend", handleBtnLeftTouchEnd);
  document.getElementById("btnRight").removeEventListener("touchstart", handleBtnRightTouchStart);
  document.getElementById("btnRight").removeEventListener("touchend", handleBtnRightTouchEnd);
  document.getElementById("btnJump").removeEventListener("touchstart", handleBtnJumpTouchStart);
  document.getElementById("btnJump").removeEventListener("touchend", handleBtnJumpTouchEnd);
  document.getElementById("btnThrow").removeEventListener("touchstart", handleBtnThrowTouchStart);
  document.getElementById("btnThrow").removeEventListener("touchend", handleBtnThrowTouchEnd);
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
  window.removeEventListener('resize', handleResize);
}


