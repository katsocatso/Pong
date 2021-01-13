canvas = document.querySelector('#canvas');
ctx = canvas.getContext('2d');

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
        ctx.textAlign = "center";
        if (aiPaddle.points == WIN_PTS) {
            ctx.fillText("Player 2 Wins!", canvas.width / 2 + 100, canvas.height / 2 + 50);
        } else {
            ctx.fillText("Player 1 Wins!", canvas.width / 2 - 100, canvas.height / 2 + 50);
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