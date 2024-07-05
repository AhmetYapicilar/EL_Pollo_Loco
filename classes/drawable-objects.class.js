/**
 * Class representing a drawable object in the game.
 */
class DrawableObject {
  /**
   * The x-coordinate of the drawable object.
   * @type {number}
   */
  x = 100;

  /**
   * The y-coordinate of the drawable object.
   * @type {number}
   */
  y = 280;

  /**
   * The height of the drawable object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the drawable object.
   * @type {number}
   */
  width = 100;

  /**
   * The image of the drawable object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * A cache for storing loaded images.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * The index of the current image being used.
   * @type {number}
   */
  currentImage = 0;

  /**
   * An array of interval IDs for any animations or timed functions.
   * @type {number[]}
   */
  intervals = [];

  /**
   * Loads an image from the given path and sets it as the object's image.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
      this.img = new Image();
      this.img.src = path;
  }

  /**
   * Draws the object's image on the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
   */
  draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads multiple images from the given array of paths and stores them in the image cache.
   * @param {string[]} array - An array of paths to the image files.
   */
  loadImages(array) {
      array.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
      });
  }
}
