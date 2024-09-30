const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let players = {};

// Обслуживание статических файлов (клиента)
app.use(express.static(path.join(__dirname, 'public')));

// Обработка подключений WebSocket
wss.on('connection', (ws) => {
    const id = Date.now();
    players[id] = { x: 400, y: 300, angle: 0 };

    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'move') {
            players[id].x = data.x;
            players[id].y = data.y;
            players[id].angle = data.angle;
            broadcast();
        }
    });

    ws.on('close', () => {
        delete players[id];
        broadcast();
    });
});

// Отправка данных всем клиентам
function broadcast() {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(players));
        }
    });
}

// Запуск сервера
server.listen(3000, '172.18.219.234', () => {
    console.log('Server is running on http://172.18.219.234:3000');
});

