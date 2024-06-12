class World {
    character = new Character();
    level = LEVEL1;
    statusbarHealth = new HealthBar();
    statusbarBottle = new BottleBar();
    statusbarCoin = new CoinBar();
    statusbarEndboss = new EndbossBar();
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    throwableObjects = [new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
        new ThrowableObject(),
    ];
    collectedBottles = [];
    throwBottles = [];
    coins = [new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ];
    collectedCoins = [];
    bgMusic = new Audio('audio/backgroundMusic.mp3');
    game_over = new Audio('audio/gameOver.mp3');
    musicEnded = false;
    gameOverSoundPlayed = false;
    

    constructor(canvas, keyboard){
        this.setWorld();
        this.keyboard = keyboard;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.run();
        this.setupAudio();
    }

    setupAudio() {
        // Hinzufügen eines Event-Listeners für Benutzerinteraktionen
        document.addEventListener('click', () => {
            this.playBackgroundMusic();
        }, { once: true }); // { once: true } stellt sicher, dass der Event-Listener nur einmal ausgeführt wird
    }

    playBackgroundMusic() {
        this.bgMusic.loop = true; // Aktivieren der integrierten Schleifenfunktion

        // Spielen der Musik
        this.bgMusic.play().catch(error => {
            console.error("Fehler beim Abspielen der Hintergrundmusik:", error);
        });
    }

    playGameOver(){
        if(this.character.isDead() && !this.gameOverSoundPlayed){
            this.gameOverSoundPlayed = true;
            this.game_over.play();
        }
    }

    initVariables(object){
        let characterCenterY = this.character.y + this.character.height / 2;
        let characterCenterX = this.character.x + this.character.width / 2;
        let objectCenterY = object.y + object.height / 2;
        let objectCenterX = object.x + object.width / 2;
        return { characterCenterX, characterCenterY, objectCenterX, objectCenterY};
    }

    collectBottle(){
        for(let i = 0; i<this.throwableObjects.length; i++){
            let bottle = this.throwableObjects[i];
            const { characterCenterX, characterCenterY, objectCenterX, objectCenterY } = this.initVariables(bottle);

        if (Math.abs(characterCenterY - objectCenterY) <= 40 && 
            Math.abs(characterCenterX - objectCenterX) <= 20) {
                
            this.collectedBottles.push(bottle);
            this.statusbarBottle.setPercentage(this.collectedBottles.length * 10);
            this.throwableObjects.splice(i, 1);
        }
    }
    }

    collectCoins(){
        for(let i = 0; i<this.coins.length; i++){
            let coin = this.coins[i];
            let { characterCenterX, characterCenterY, objectCenterX, objectCenterY } = this.initVariables(coin);

            if (Math.abs(characterCenterY - objectCenterY) <= 40 && 
            Math.abs(characterCenterX - objectCenterX) <= 20) 
                {       
                this.collectedCoins.push(coin[i]);
                coin.playSound();
                this.statusbarCoin.setPercentage(this.collectedCoins.length * 10);
                this.coins.splice(i, 1);
        }
    }
    } 

    run(){
        setInterval(() => {
           this.checkCollision();
           this.checkThrowObjects();
           this.endbossGetsBottle();
           this.bottleFallsOnGround();
           this.playGameOver();
        }, 200);

        setInterval(() => {
            this.collectBottle();
            this.collectCoins();
            this.chickenDead();
        }, 1000 / 60);
    }

    checkThrowObjects(){
        if(this.keyboard.D && this.collectedBottles.length > 0){
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y);
            bottle.setWorld(this);
            bottle.throw(this.character.x + 50, this.character.y);
            this.collectedBottles.splice(this.collectedBottles.length - 1, 1);
            this.statusbarBottle.setPercentage(this.collectedBottles.length * 10);
            this.throwBottles.push(bottle);
        }
    }

    endbossGetsBottle(){
        let i = this.level.enemies.length - 1;
        for(let x = 0; x < this.throwBottles.length; x++){
            let bottle = this.throwBottles[x];
            let enemy = this.level.enemies[i];
            if ((enemy.x > this.character.x && bottle.x >= enemy.x - 30) || 
                (enemy.x < this.character.x && bottle.x <= enemy.x + enemy.width - 20)) {
                
                bottle.splash();
                enemy.hit();
                enemy.energy-=15;
                this.statusbarEndboss.setPercentage(enemy.energy);
                this.throwBottles.splice(0, 1);
                if(enemy.isDead()){
                   enemy.finalDeadAnimation();
                }
            }
        }
    }

    bottleFallsOnGround(){
        if(this.throwBottles.length > 0){
            let bottle = this.throwBottles[0];
            if(bottle.y > 400){
                bottle.splash();
                bottle.x = -10;
                this.throwBottles.splice(0, 1);
            }
        }
    }

    checkCollision(){
        this.level.enemies.forEach((enemy) =>{
            if(this.character.y > 170 && this.character.isColliding(enemy) && enemy.energy > 5){
                this.character.hit();
                this.character.hurt_sound.play();
                this.statusbarHealth.setPercentage(this.character.energy);
            };
        } )
    }

    chickenDead(){
        for(let i = 0; i < this.level.enemies.length; i++){
            let chicken = this.level.enemies[i];
            const { characterCenterX, characterCenterY, objectCenterX, objectCenterY } = this.initVariables(chicken);
        if((Math.abs(characterCenterX - objectCenterX)) <= 60 &&
            this.character.y > 140 && this.character.y < 170 && this.character.speedY < 0){
            this.level.enemies[i].energy = 0;
            this.character.jump(2);
        }
        }
    }

    setWorld(){
        this.character.world = this;
        this.throwableObjects.forEach(bottle => bottle.setWorld(this));
        this.level.enemies.forEach(enemy => enemy.setWorld(this));
    }

    draw(){
       this.ctx.clearRect(0, 0, canvas.width, canvas.height);
       this.ctx.translate(this.camera_x, 0);

       this.addObjectsToMap(this.level.backgroundObjects);
       this.addObjectsToMap(this.level.clouds);
       this.addObjectsToMap(this.coins);
       this.addObjectsToMap(this.throwableObjects);
       this.addObjectsToMap(this.throwBottles);
       this.addToMap(this.character);

       this.ctx.translate(-this.camera_x, 0);
       this.addToMap(this.statusbarHealth);
       this.addToMap(this.statusbarBottle);
       this.addToMap(this.statusbarCoin);
       this.addToMap(this.statusbarEndboss);
       this.ctx.translate(this.camera_x, 0);

       this.addObjectsToMap(this.level.enemies);

       this.ctx.translate(-this.camera_x, 0);

       let self = this;
       requestAnimationFrame(function(){
        self.draw();
       })
    }

    addObjectsToMap(objects){
        objects.forEach(object => {
            this.addToMap(object);
           })
    }

    addToMap(mo){
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo){
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}
