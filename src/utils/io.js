const { Server } = require('socket.io');

const init = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);
    
        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        })
    })

    return socketServer;
}

module.exports =init;

