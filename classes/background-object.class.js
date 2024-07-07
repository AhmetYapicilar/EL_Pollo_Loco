/**
 * Class representing a background object in the game.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
  /**
   * The width of the background object.
   * @type {number}
   */
  width = 720;

  /**
   * The height of the background object.
   * @type {number}
   */
  height = 480;

  /**
   * Creates a new background object.
   * @param {string} imagepath - The path to the image of the background object.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagepath, x) {
    super().loadImage(imagepath);
    /**
     * The x-coordinate of the background object.
     * @type {number}
     */
    this.x = x;

    /**
     * The y-coordinate of the background object, calculated based on the object's height.
     * @type {number}
     */
    this.y = 480 - this.height;
  }
}
