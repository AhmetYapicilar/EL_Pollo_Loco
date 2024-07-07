/**
 * Class representing a coin collectable object in the game.
 * @extends CollectableObject
 */
class Coin extends CollectableObject {
  /**
   * Array of image paths for the coin animation.
   * @type {string[]}
   */
  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Sound played when the coin is collected.
   * @type {Audio}
   */
  COIN_SOUND = new Audio("audio/collectCoin.mp3");

  /**
   * The offset values for collision detection.
   * @type {Object}
   */
  offset = {
    top: 5,
    left: 10,
    right: 10,
    bottom: 25,
  };

  /**
   * Creates a new coin object.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    if (x && y) {
      this.x = x;
      this.y = y;
    }
    this.loadImages(this.IMAGES_COINS);
    this.animate();
  }

  /**
   * Animates the coin by playing the coin images in a loop.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 500);
  }

  /**
   * Plays the sound effect when the coin is collected.
   */
  playSound() {
    this.COIN_SOUND.play();
  }
}
