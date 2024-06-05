const { Server } = require('socket.io');
const MessageService = require('../services/messageService');
const messageService = new MessageService();

const init = (httpServer) => {
    const socketServer = new Server(httpServer);

    socketServer.on('connection', async (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);

        socket.emit('messages', await messageService.getMessages());

        socket.on('newUser', (user) => {
            console.log(`${user} ha iniciado sesión`);
            socket.broadcast.emit('newUser', user);
        })

        socket.on('newMessage', async (message) => {
            await messageService.createMessage(message);
            socketServer.emit('message', message);
        })

        socket.on('userTyping', (user) => {
            socket.broadcast.emit('userTyping', user);
        })
    
        socket.on('disconnect', () => {
            console.log(`Usuario desconectado: ${socket.id}`);
        })
    })

    return socketServer;
}

module.exports =init;

