const messageModel = require('./models/messageModel');

class MessageDaoMongo {
    async getMessages(){
        try {
            const messages = await messageModel.find().lean();
            return messages;
        } catch (error) {
            throw (error);
        }
    }

    async getMessageById(msgId){
        try {
            const message = await messageModel.findById(msgId);

            if (message){
                return message;
            } else {
                throw new Error(`Mensaje no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async createMessage(data){
        try {
            const newMessage = await messageModel.create(data);
            return newMessage;
        } catch (error) {
            throw (error);
        }
    }

    async updateMessage(msgId, newData){
        try {
            const updatedMessage = await messageModel.findByIdAndUpdate(msgId, newData, {new: true});
            
            if (updatedMessage){
                return updatedMessage;
            } else {
                throw new Error(`Mensaje no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async deleteMessage(msgId){
        try {
            const deletedMessage = await messageModel.findByIdAndDelete(msgId);

            if (deletedMessage){
                return { 
                    id: msgId, 
                    msg: `Mensaje eliminado correctamente` 
                };
            } else {
                throw new Error(`Mensaje no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async deleteMessages(){
        try {
            await messageModel.deleteMany({});
            return { msg: `Mensajes eliminados correctamente` };
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = MessageDaoMongo;