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
        ball.update();
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