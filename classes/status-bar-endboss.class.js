/**
 * Represents a status bar for the end boss, displaying its health percentage.
 * @extends Statusbar
 */
class EndbossBar extends Statusbar {
  /**
   * X coordinate of the status bar.
   * @type {number}
   */
  x = 0;

  /**
   * Y coordinate of the status bar.
   * @type {number}
   */
  y = 40;

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
    "./img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "./img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];

  /**
   * Current percentage of the end boss's health.
   * @type {number}
   */
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.setPercentage(100);
  }

  /**
   * Sets the percentage fill of the end boss's health bar and updates the displayed image accordingly.
   * @param {number} percentage - The percentage fill of the end boss's health bar (0-100).
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
