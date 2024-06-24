let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
    mobileButtons();
    handleResize(); // Check the initial state
    window.addEventListener('resize', handleResize);
}

function startGame() {
    world.screen.startScreen = false;
    world.draw();
    world.playBackgroundMusic();
    console.log("My character is", world.character);
    console.log("My enemie is", world.level.enemies[0]);
    mobileButtons();
    handleResize(); // Check the initial state
    window.addEventListener('resize', handleResize);
    document.getElementById("startButton").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById('screen').style.display = 'none';
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
}

function generateCSSForNormalscreen(){
  document.getElementById('showInFullscreen').style.position = "static";
  document.getElementById('showInFullscreen').style.display = "flex";
  document.getElementById('canvas').style.width = '720px';
  document.getElementById('canvas').style.height = '480px';
  document.getElementById('screen').style.width = '720px';
  document.getElementById('screen').style.height = '480px';
  document.getElementById('settings-screen').style.width = '720px';
  document.getElementById('settings-screen').style.height = '480px';
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

function openSettings(){
    document.getElementById('screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'flex';
    console.log('settings opened');
}

function closeSettings(){
    document.getElementById('settings-screen').style.display = 'none';
        document.getElementById('canvas').style.display = 'block';
        document.getElementById('startButton').style.display = 'block';
        document.getElementById('title').style.display = 'block';
        document.getElementById('screen').style.display = 'flex';
}

function handleResize() {
    if (window.innerWidth < 800 && window.innerHeight > window.innerWidth) {
        justShowTurnDevice();
    } else {
        justHideTurnDevice();
    }
    if (window.innerWidth > 800) {
        document.getElementById('mobileButtons').style.display = 'none';
    } else if (window.innerWidth < 800 && !(window.innerHeight > window.innerWidth)) {
        document.getElementById('mobileButtons').style.display = 'flex';
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
}

function justHideTurnDevice(){
    document.getElementById('turnDeviceScreen').style.display = 'none';
        document.getElementById('canvas').style.display = 'block';
        document.getElementById('mobileButtons').style.display = 'flex';
        document.getElementById('startButton').style.display = 'block';
        document.getElementById('title').style.display = 'block';
        document.getElementById('screen').style.display = 'flex';
}

function mobileButtons() {
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.LEFT = true;
    });
  
    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.LEFT = false;
    });
  
    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.RIGHT = true;
    });
  
    document.getElementById("btnRight").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.RIGHT = false;
    });
  
    document.getElementById("btnJump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.SPACE = true;
    });
  
    document.getElementById("btnJump").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.SPACE = false;
    });
  
    document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard.D = true;
    });
  
    document.getElementById("btnThrow").addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard.D = false;
    });
  }
  

window.addEventListener("keydown", (e) => {
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
});

window.addEventListener("keyup", (e) => {
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
});


