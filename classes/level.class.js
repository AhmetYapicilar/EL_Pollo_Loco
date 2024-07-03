class Level{
   enemies = [
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new Endboss()
    ];

    clouds = [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ];

    backgroundObjects = []
    level_end_x = 4000;

    constructor(){
        this.bgObjects();
    }

    bgObjects(){
        for(let i = 0; i < 10; i++){
            let j;
            if(this.isEven(i)){
                j = 2;
            } else {
                j = 1;
            }
            this.backgroundObjects.push(new BackgroundObject('./img/5_background/layers/air.png', -719 + (719*i)));
            this.backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/3_third_layer/${j}.png`, -719 + (719*i)));
            this.backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/2_second_layer/${j}.png`, -719 + (719*i)));
            this.backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/1_first_layer/${j}.png`, -719 + (719*i)));
        }
    }
    
    isEven(i){
        return i % 2 === 0;
    }
}