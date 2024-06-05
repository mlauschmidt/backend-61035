const MessageService = require('../services/messageService');
const messageService = new MessageService();

class MessageController {
    async getMessages (req, res, next) {
        try {
            const messages = await messageService.getMessages();

            return res.status(200).json(messages);
        } catch (error) {
            next (error);
        }
    }

    async getMessageById (req, res, next) {
        try {
            const { mid } = req.params;
            const message = await messageService.getMessageById(mid);
            
            return res.status(200).json(message);
        } catch (error) {
            next (error);
        }
    }

    async createMessage (req, res, next) {
        try {
            const data = req.body;
            const newMessage = await messageService.createMessage(data);
    
            return res.status(201).json(newMessage);
        } catch (error) {
            next (error);
        }
    }

    async updateMessage (req, res, next) {
        try {
            const { mid } = req.params;
            const newData = req.body;
            const updatedMessage = await messageService.updateMessage(mid, newData);
            
            return res.status(200).json(updatedMessage);
        } catch (error) {
            next (error);
        }
    }

    async deleteMessage (req, res, next) {
        try {
            const { mid } = req.params;
            const deletedMessage = await messageService.deleteMessage(mid);
            
            return res.status(200).json({ message: deletedMessage.msg });
        } catch (error) {
            next (error);
        }
    }

    async deleteMessages (req, res, next) {
        try {
            const deletedMessages = await messageService.deleteMessages();
            
            return res.status(200).json({ message: deletedMessages.msg });
        } catch (error) {
            next (error);
        }
    }
}

module.exports = MessageController;