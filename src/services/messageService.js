const MessageDaoMongo = require('../dao/mongo/messageDao');
const messageDao = new MessageDaoMongo();

class MessageService {
    async getMessages () {
        try {
            return await messageDao.getMessages();
        } catch (error) {
            throw (error);
        }
    }

    async getMessageById (msgId) {
        try {
            return await messageDao.getMessageById(msgId);
        } catch (error) {
            throw (error);
        }
    }

    async createMessage (data) {
        try {
            return await messageDao.createMessage(data);
        } catch (error) {
            throw (error);
        }
    }

    async updateMessage (msgId, newData) {
        try {
            return await messageDao.updateMessage(msgId, newData);
        } catch (error) {
            throw (error);
        }
    }

    async deleteMessage (msgId) {
        try {
            return await messageDao.deleteMessage(msgId);
        } catch (error) {
            throw (error);
        }
    }

    async deleteMessages () {
        try {
            return await messageDao.deleteMessages();
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = MessageService;