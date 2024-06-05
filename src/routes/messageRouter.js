const { Router } = require('express');
const messageRouter = Router();
const MessageController = require('../controllers/messageController');
const messageController = new MessageController();

messageRouter.get('/', messageController.getMessages);
    
messageRouter.get('/:mid', messageController.getMessageById);
    
messageRouter.post('/', messageController.createMessage);
    
messageRouter.put('/:mid', messageController.updateMessage);
    
messageRouter.delete('/:mid', messageController.deleteMessage);

messageRouter.delete('/', messageController.deleteMessages);

module.exports = messageRouter;