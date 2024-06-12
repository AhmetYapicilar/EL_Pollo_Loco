class Cloud extends MovableObject {
    y = 0 + Math.random() * 20
    x = 0 + Math.random() * 2000;
    width = 500;
    height = 250;

    constructor(){
        super().loadImage(" ./img/5_background/layers/4_clouds/1.png");
        this.animate();
    }

    animate(){
        setInterval(() => {
            this.moveLeft();
        }, 1000/60)
    }
    
}