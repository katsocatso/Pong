canvas = document.querySelector('#canvas');
ctx = canvas.getContext('2d');

class Ball {
    constructor() {
        this.r = 15;
        this.xAcc = 1.3;
        this.yAcc = 1.3;
        this.reset();
    }

    reset(servingP, ai) {
        this.x = canvas.width / 2 - this.r / 2;
        this.y = canvas.height / 2 - this.r / 2;

        this.xSpeed = Math.random() + 3;
        if (servingP == ai){
            this.xSpeed = -this.xSpeed;
        }

        this.ySpeed = Math.random() * 3;
        let isDown = Math.random() > 0.5;
        if (isDown) {
            this.ySpeed = -this.ySpeed;
        }
    }

    display() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.r, this.r);
    }

    fastAngle(){
        if (this.ySpeed < 0){
            this.ySpeed = -9;
        } else {
            this.ySpeed = 9;
        }

        if (this.xSpeed < 0) {
            this.xSpeed = 0.6 * Math.abs(this.ySpeed);
        } else {
            this.xSpeed = 0.6 * Math.abs(this.ySpeed);
        }
    }

    randomSpeed(){
        if (this.ySpeed < 0){
            this.ySpeed = -(Math.random() * 3);
        } else {
            this.ySpeed = Math.random() * 3;
        }

        if (this.xSpeed < 0){
            this.xSpeed = Math.random() * 2 + 3;
        } else {
            this.xSpeed = -(Math.random() * 2 + 3);
        }
    }
    
    hitPaddle(paddle, isAI) {
        let withinPaddleY = paddle.y <= this.y + this.r && this.y <= paddle.y + paddle.height;
        let hitsPaddleX;

        if (isAI) {
            hitsPaddleX = paddle.x <= this.x + this.r &&
                this.x + this.r <= paddle.x + paddle.width;
        } else {
            hitsPaddleX = paddle.x + paddle.width >= this.x && this.x >= paddle.x;
        }

        if (withinPaddleY && hitsPaddleX) {
            if (this.y + this.r <= paddle.y + paddle.height / 4 ||
                this.y >= paddle.y + paddle.height * 3/4) {
                this.fastAngle();
            } else {
                this.randomSpeed();
           }

           if (isAI){
               this.x = paddle.x - this.r;
           } else {
               this.x = paddle.x + paddle.width;
           }
           return true;
        }
    }
}