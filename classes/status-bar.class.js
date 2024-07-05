/**
 * Represents a status bar, which displays a visual representation of a percentage.
 * @extends DrawableObject
 */
class Statusbar extends DrawableObject {
    /**
     * Array of image paths representing different fill levels of the status bar.
     * @type {string[]}
     */
    IMAGES_STATUSBAR = [];
  
    /**
     * Current percentage value of the status bar.
     * @type {number}
     */
    percentage = 100;
  
    constructor() {
      super();
    }
  
    /**
     * Sets the percentage value of the status bar.
     * This method should be implemented in derived classes.
     * @abstract
     * @param {number} percentage - The percentage value to set.
     */
    setPercentage(percentage) {
      // This method should be implemented in derived classes
    }
  
    /**
     * Resolves the index of the image in `IMAGES_STATUSBAR` based on the current percentage.
     * This method should be implemented in derived classes.
     * @abstract
     * @returns {number} Index of the image in `IMAGES_STATUSBAR`.
     */
    resolveImageIndex() {
      // This method should be implemented in derived classes
    }
  }
  