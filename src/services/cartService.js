/* const path = require('path');
const CartDaoFS = require('../dao/fileSystem/cartDao');
const file = path.join(__dirname, '../dao/fileSystem/data/carts.json');
const cartDao = new CartDaoFS(file); */
const CartDaoMongo = require('../dao/mongo/cartDao');
const cartDao = new CartDaoMongo();

class CartService {
    async getCarts(){
        try {
           return await cartDao.getCarts();
        } catch (error) {
            throw (error);
        }
    }

    async getCartById(cartId){
        try {
            return await cartDao.getCartById(cartId);
        } catch (error) {
            throw (error);
        }
    }

    async createCart(){
        try {
            return await cartDao.createCart();
        } catch (error) {
            throw (error);
        }
    }

    async updateCart(cartId, prodId){
        try {
            return await cartDao.updateCart(cartId, prodId);
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = CartService;