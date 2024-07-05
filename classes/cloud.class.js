/**
 * Class representing a cloud in the game.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /**
     * The y-coordinate of the cloud, randomly generated.
     * @type {number}
     */
    y = 0 + Math.random() * 20;

    /**
     * The x-coordinate of the cloud, randomly generated.
     * @type {number}
     */
    x = 0 + Math.random() * 2000;

    /**
     * The width of the cloud.
     * @type {number}
     */
    width = 500;

    /**
     * The height of the cloud.
     * @type {number}
     */
    height = 250;

    /**
     * Creates a new cloud object.
     */
    constructor() {
        super().loadImage(" ./img/5_background/layers/4_clouds/1.png");
        this.animate();
    }

    /**
     * Animates the cloud by moving it to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
