class EndbossBar extends Statusbar {
    x = 0;
    y = 40;
    width = 200;
    height = 50;
IMAGES_STATUSBAR = ['./img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
'./img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
'./img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
'./img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
'./img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
'./img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
];
percentage = 100;

constructor(){
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.setPercentage(100);
}

setPercentage(percentage){
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR[this.resolveImaageIndex()];
    this.img = this.imageCache[path];
}

resolveImaageIndex(){
    if(this.percentage > 80){
        return 5;
    } else  if(this.percentage > 60){
        return 4;
    } else  if(this.percentage > 40){
        return 3;
    } else  if(this.percentage > 20){
        return 2;
    } else  if(this.percentage > 0){
        return 1;
    } else {
        return 0;
    } 
}

}