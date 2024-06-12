class CoinBar extends Statusbar {
    x = 500;
    y = 40;
    width = 200;
    height = 50;
IMAGES_STATUSBAR = ['./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
'./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
'./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
'./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
'./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
'./img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
];
percentage = 0;

constructor(){
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.setPercentage(0);
}

setPercentage(percentage){
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR[this.resolveImaageIndex()];
    this.img = this.imageCache[path];
}

resolveImaageIndex(){
    if(this.percentage == 100){
        return 5;
    } else  if(this.percentage > 70){
        return 4;
    } else  if(this.percentage > 40){
        return 3;
    } else  if(this.percentage > 30){
        return 2;
    } else  if(this.percentage >= 10){
        return 1;
    } else {
        return 0;
    } 
}
}