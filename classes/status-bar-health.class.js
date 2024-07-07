/**
 * Represents a status bar for health, displaying its percentage.
 * @extends Statusbar
 */
class HealthBar extends Statusbar {
  /**
   * X coordinate of the health bar.
   * @type {number}
   */
  x = 0;

  /**
   * Y coordinate of the health bar.
   * @type {number}
   */
  y = 0;

  /**
   * Width of the health bar.
   * @type {number}
   */
  width = 200;

  /**
   * Height of the health bar.
   * @type {number}
   */
  height = 50;

  /**
   * Array of image paths representing different fill levels of the health bar.
   * @type {string[]}
   */
  IMAGES_STATUSBAR = [
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "./img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  /**
   * Current percentage of the health bar.
   * @type {number}
   */
  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBAR);
    this.setPercentage(100);
  }

  /**
   * Sets the percentage fill of the health bar and updates the displayed image accordingly.
   * @param {number} percentage - The percentage fill of the health bar (0-100).
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
