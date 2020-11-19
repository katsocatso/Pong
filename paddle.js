canvas = document.querySelector('#canvas');
ctx = canvas.getContext('2d'); //define canvas globally to use in Paddle functions

class Paddle {
    //defining canvas here -> canvas is undefined in display
    constructor(x) {
        this.x = x;
        this.y = canvas.height / 2;
        this.height = 80;
        this.width = 20;

        this.isUp = false;
        this.isDown = false;
        this.points = 0;
    }

    display() {
        ctx.fillStyle = "white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    up() {
        if (this.y > 0) {
            this.y -= 11;
        }
    }

    down() {
        if (this.y < canvas.height - this.height) {
            this.y += 11;
        }
    }

    update() {
        if (this.isUp) {
            this.up();
        } else if (this.isDown) {
            this.down();
        }
    }
} 