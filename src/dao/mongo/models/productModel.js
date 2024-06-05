const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: Array,
        default: []
    },
    status: {
        type: Boolean,
        default: true
    }
})

const productModel = model('products', productSchema);

module.exports = productModel;