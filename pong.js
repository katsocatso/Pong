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

function setup() {
    //createCanvas(window.innerWidth, window.innerHeight);
    createCanvas(700, 450);
    playerPaddle = new Paddle(26);
    aiPaddle = new Paddle(canvas.width - 48);
    ball = new Ball();
    gameState = "start";
    servingPlayer = playerPaddle;
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