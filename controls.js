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