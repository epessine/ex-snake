let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let speed = 0;
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let comida = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

function criarBG() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobra() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function criarComida() {
    context.fillStyle = "black";
    context.fillRect(comida.x, comida.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";      
}

function iniciarJogo() {
    document.querySelector(".popup").style.visibility = "hidden";
    document.querySelector(".popup2").style.visibility = "hidden";

    if(snake[0].x > 15 * box) snake[0].x = 0 * box;
    if(snake[0].x < 0) snake[0].x = 15 * box;
    if(snake[0].y > 15 * box) snake[0].y = 0 * box;
    if(snake[0].y < 0) snake[0].y = 15 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            document.querySelector(".popup").style.visibility = "visible";
        }
    }

    criarBG();
    criarCobra();
    criarComida();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != comida.x || snakeY != comida.y) {
        snake.pop();
    } else {
        comida.x = Math.floor(Math.random() * 16) * box;
        comida.y = Math.floor(Math.random() * 16) * box;
    }

    

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

function reiniciar() {
    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box
    }
    direction = "right";
    comida = {
        x: Math.floor(Math.random() * 16) * box,
        y: Math.floor(Math.random() * 16) * box
    }
    iniciarJogo();
    speed = 100;
    jogo = setInterval(iniciarJogo, speed);
}