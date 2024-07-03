class DrawableObject {
    x = 100;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    intervals = [];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(array) {
        array.forEach((path) => {
          let img = new Image();
          img.src = path;
          this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Coin) {
          ctx.beginPath();
          ctx.lineWidth = "5";
          ctx.strokeStyle = "blue";
          ctx.rect(this.x, this.y, this.width, this.height);
          ctx.stroke();
      }
    }

    clearAllIntervals() {
        for (let i = 0; i < 999999999999999999999999; i++) {
          window.clearInterval(i);
        }
      }
}