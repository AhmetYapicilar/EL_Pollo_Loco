/**
 * Represents a status bar for a bottle, displaying its fill percentage.
 * @extends Statusbar
 */
class BottleBar extends Statusbar {
  /**
   * X coordinate of the status bar.
   * @type {number}
   */
  x = 500;

  /**
   * Y coordinate of the status bar.
   * @type {number}
   */
  y = 0;

  /**
   * Width of the status bar.
   * @type {number}
   */
  width = 200;

  /**
   * Height of the status bar.
   * @type {number}
   */
  height = 50;

  /**
   * Array of image paths representing different fill levels of the status bar.
   * @type {string[]}
   */
  IMAGES_STATUSBAR = [
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "./img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Current percentage fill of the bottle.
   * @type {number}
   */
  percentage = 0;

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.setPercentage(0);
  }

  /**
   * Sets the percentage fill of the bottle and updates the displayed image accordingly.
   * @param {number} percentage - The percentage fill of the bottle (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_STATUSBAR[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image in `IMAGES_STATUSBAR` based on the current percentage.
   * @returns {number} Index of the image in `IMAGES_STATUSBAR`.
   */
  resolveImageIndex() {
    if (this.percentage > 80) {
      return 5;
    } else if (this.percentage > 60) {
      return 4;
    } else if (this.percentage > 40) {
      return 3;
    } else if (this.percentage > 20) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
