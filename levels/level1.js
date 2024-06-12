const LEVEL1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],

    backgroundObjects = []
);
bgObjects();

function bgObjects(){
    for(let i = 0; i < 10; i++){
        let j;
        if(isEven(i)){
            j = 2;
        } else {
            j = 1;
        }
        backgroundObjects.push(new BackgroundObject('./img/5_background/layers/air.png', -719 + (719*i)));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/3_third_layer/${j}.png`, -719 + (719*i)));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/2_second_layer/${j}.png`, -719 + (719*i)));
        backgroundObjects.push(new BackgroundObject(`./img/5_background/layers/1_first_layer/${j}.png`, -719 + (719*i)));
    }
}

function isEven(i){
    return i % 2 === 0;
}