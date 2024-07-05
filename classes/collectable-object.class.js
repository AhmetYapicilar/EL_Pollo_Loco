/**
 * Class representing a collectable object in the game.
 * @extends MovableObject
 */
class CollectableObject extends MovableObject {
    /**
     * The width of the collectable object.
     * @type {number}
     */
    width = 80;

    /**
     * The height of the collectable object.
     * @type {number}
     */
    height = 100;

    /**
     * The x-coordinate of the collectable object, randomly generated.
     * @type {number}
     */
    x = 300 + Math.random() * 1500;

    /**
     * The y-coordinate of the collectable object, randomly generated.
     * @type {number}
     */
    y = 50 + Math.random() * 200;
}
