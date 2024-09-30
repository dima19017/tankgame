// Конфигурация для сервера
const serverConfig = {
    ip: '172.18.219.234', // IP-адрес сервера
    port: 3000,           // Порт для прослушивания
    gameSettings: {
        maxPlayers: 10,   // Максимальное количество игроков
        tickRate: 60      // Частота обновления сервера (FPS)
    }
};

module.exports = serverConfig;
