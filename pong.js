//var
let playerPaddle;
let aiPaddle;
let ball;
let gameState;
let servingPlayer;
// var canvas = document.createElement("canvas");

const UP_ARROW = 38;
const DOWN_ARROW = 40;
const ENTER = 13;
const WIN_PTS = 10;
const screenColor = 'rgb(31, 32, 41)';
const objectsColor = 'rgb(223, 225, 226)';

function createCanvas(w, h) {
    canvas.height = h;
    canvas.width = w;
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto";
}

function background() {
    ctx.fillStyle = screenColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //without first two lines, code compiles but has no effect

    //drawing midline
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 6]);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
}

function setup() {
    //createCanvas(window.innerWidth, window.innerHeight);
    createCanvas(700, 450);
    playerPaddle = new Paddle(26);
    aiPaddle = new Paddle(canvas.width - 48);
    ball = new Ball();
    gameState = "start";
    servingPlayer = playerPaddle;
}

function displayStateMsg() {
    if (gameState == "start") {
        ctx.textAlign = "right";
        ctx.fillStyle = objectsColor;
        ctx.font = "60px Impact";
        ctx.fillText("PONG", canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = "20px Impact";
        ctx.fillText("Press Enter to start", canvas.width / 2 - 100, canvas.height / 2 + 60);
    } else if (gameState == "end") {
        ctx.fillStyle = objectsColor;
        ctx.font = "20px Impact";
        if (aiPaddle.points == WIN_PTS) {
            //ctx.textAlign = "right";
            ctx.fillText("Player 2 Wins!", canvas.width / 2 - 70, canvas.height / 2 + 50);
        } else {
            //ctx.textAlign = "left";
            ctx.fillText("Player 1 Wins!", canvas.width / 2 - 70, canvas.height / 2 + 50);
        }
    }
}

function displayScore() {
    ctx.font = "50px Impact";
    ctx.fillStyle = objectsColor;
    ctx.textAlign = "center";
    ctx.fillText(playerPaddle.points.toString(), canvas.width / 2 - 30, 60);
    ctx.fillText(aiPaddle.points.toString(), canvas.width / 2 + 30, 60);
}

function draw() {
    background();
    displayScore();
    displayStateMsg();

    ball.display();
    playerPaddle.display();
    aiPaddle.display();
}

function reset(servingPlayer) {
    playerPaddle.reset(26);
    aiPaddle.reset(canvas.width - 48);
    ball.reset(servingPlayer, aiPaddle);
}

function update() {
    let animID = window.requestAnimationFrame(update);
    if (gameState == "play") {
        ballUpdate();
        playerPaddle.update();
        processAI();
        aiPaddle.update();
        ball.hitPaddle(playerPaddle, false);
        ball.hitPaddle(aiPaddle, true);

        if (aiPaddle.points == WIN_PTS || playerPaddle.points == WIN_PTS) {
            gameState = "end";
            cancelAnimationFrame(animID);
        }
    }
    draw();
}

function ballUpdate() {
    if (ball.y < 0 || ball.y > canvas.height - ball.r) {    // ball hits wall
        ball.ySpeed = -ball.ySpeed;
    }
    if (ball.x < 0) {
        aiPaddle.points += 1;
        servingPlayer = playerPaddle;
        reset(servingPlayer);
    } else if (ball.x > canvas.width - ball.r) {
        playerPaddle.points += 1;
        servingPlayer = aiPaddle;
        reset(servingPlayer);
    }

    ball.x += ball.xAcc * ball.xSpeed;
    ball.y += ball.
        yAcc * ball.ySpeed;
}

function keyHeld(e) {
    if (e.keyCode == UP_ARROW) {
        playerPaddle.isUp = true;
    } else if (e.keyCode == DOWN_ARROW) {
        playerPaddle.isDown = true;
    }
}

function keyReleased(e) {
    if (e.keyCode == UP_ARROW) {
        playerPaddle.isUp = false;
    } else if (e.keyCode == DOWN_ARROW) {
        playerPaddle.isDown = false;
    }
}

function keyPressed(e) {
    if (e.keyCode == ENTER && gameState == "start") {
        gameState = "play";
        update();
        update();
    }
}

function processAI() {
    let paddleMid = aiPaddle.y + aiPaddle.height / 2;
    if (paddleMid > ball.y) {
        aiPaddle.isUp = true;
        aiPaddle.isDown = false;
    } else {
        aiPaddle.isDown = true;
        aiPaddle.isUp = false;
    }
}

function play() {
    if (gameState == "start") {
        // display starting screen
        // press 'i' to see the instructions?
    } else if (gameState == "serve") {

    }
}

window.addEventListener("load", () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');

    //make play again button when game ends
    //make 2 player option

    window.addEventListener("keydown", keyHeld);
    window.addEventListener("keyup", keyReleased);
    window.addEventListener("keypress", keyPressed);
    //keyboard interactions are window events, not canvas events

    setup();
    draw();
});