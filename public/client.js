const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Параметры танка
const tank = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 40,
    height: 40,
    color: 'green',
    speed: 2
};

// Подключение WebSocket
const ws = new WebSocket('ws://' + window.location.host);

// Управление
document.addEventListener('keydown', (e) => {
    let dx = 0, dy = 0;
    switch (e.key) {
        case 'ArrowUp': dy = -tank.speed; break;
        case 'ArrowDown': dy = tank.speed; break;
        case 'ArrowLeft': dx = -tank.speed; break;
        case 'ArrowRight': dx = tank.speed; break;
    }
    ws.send(JSON.stringify({ type: 'move', dx, dy }));
});

// Отрисовка танка
function drawTank() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = tank.color;
    ctx.fillRect(tank.x, tank.y, tank.width, tank.height);
}

// Отрисовка других игроков
let players = {};

ws.onmessage = (message) => {
    players = JSON.parse(message.data);
};

function drawPlayers() {
    for (const id in players) {
        const player = players[id];
        ctx.fillStyle = 'red';
        ctx.fillRect(player.x, player.y, 40, 40);
    }
}

// Игровой цикл
function gameLoop() {
    drawTank();
    drawPlayers();
    requestAnimationFrame(gameLoop);
}

gameLoop();
