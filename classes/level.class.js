/**
 * Represents a level in the game with enemies, clouds, and background objects.
 */
class Level {
  /**
   * Array of enemies in the level.
   * @type {Array<MovableObject>}
   */
  enemies = [
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Endboss(),
  ];

  /**
   * Array of cloud objects in the level.
   * @type {Array<Cloud>}
   */
  clouds = [new Cloud(), new Cloud(), new Cloud()];

  /**
   * Array of background objects in the level.
   * @type {Array<BackgroundObject>}
   */
  backgroundObjects = [];

  /**
   * X-coordinate where the level ends.
   * @type {number}
   */
  level_end_x = 4000;

  /**
   * Constructs a new Level instance and initializes background objects.
   */
  constructor() {
    this.generateBackgroundObjects();
  }

  /**
   * Generates background objects for the level.
   */
  generateBackgroundObjects() {
    for (let i = 0; i < 10; i++) {
      let j;
      if (this.isEven(i)) {
        j = 2;
      } else {
        j = 1;
      }
      this.backgroundObjects.push(
        new BackgroundObject(
          "./img/5_background/layers/air.png",
          -719 + 719 * i
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          `./img/5_background/layers/3_third_layer/${j}.png`,
          -719 + 719 * i
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          `./img/5_background/layers/2_second_layer/${j}.png`,
          -719 + 719 * i
        )
      );
      this.backgroundObjects.push(
        new BackgroundObject(
          `./img/5_background/layers/1_first_layer/${j}.png`,
          -719 + 719 * i
        )
      );
    }
  }

  /**
   * Checks if a number is even.
   * @param {number} i - The number to check.
   * @returns {boolean} True if the number is even, false otherwise.
   */
  isEven(i) {
    return i % 2 === 0;
  }
}
