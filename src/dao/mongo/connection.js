const { connect } = require('mongoose');
require('dotenv/config');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce';

const initMongoDB = async () => {
    try {
        await connect(MONGO_URL);
        console.log('Conectado a la base de datos de MONGODB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = initMongoDB;