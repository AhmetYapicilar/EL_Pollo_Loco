class Coin extends CollectableObject {

    IMAGES_COINS = ['img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    COIN_SOUND = new Audio('audio/collectCoin.mp3');
    offset = {
        top: 5,
        left: 10,
        right: 10,
        bottom: 25
      };
   
    constructor(x, y){
      super().loadImage('img/8_coin/coin_1.png'); 
      if(x && y){
        this.x = x;
        this.y = y;
    } 
      this.loadImages(this.IMAGES_COINS);
      this.animate();
    }

    animate(){
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 500)
    }

    playSound(){
        this.COIN_SOUND.play();
    }

}