/* const path = require('path');
const CartDaoFS = require('../dao/fileSystem/cartDao');
const file = path.join(__dirname, '../dao/fileSystem/data/carts.json');
const cartDao = new CartDaoFS(file);
const ProductDaoFS = require('../dao/fileSystem/productDao');
const file = path.join(__dirname, '../dao/fileSystem/data/products.json');
const productDao = new ProductDaoFS(file); */
const CartDaoMongo = require('../dao/mongo/cartDao');
const cartDao = new CartDaoMongo();
const ProductDaoMongo = require('../dao/mongo/productDao');
const productDao = new ProductDaoMongo();

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

    async verifyCartAndProd(cartId, prodId){
        await cartDao.getCartById(cartId);
        await productDao.getProductById(prodId);
    }

    async addProdToCart(cartId, prodId, qty){
        try {
            await this.verifyCartAndProd(cartId, prodId);
            return await cartDao.addProdToCart(cartId, prodId, qty);
        } catch (error) {
            throw (error);
        }
    }

    async deleteProdInCart(cartId, prodId){
        try {
            await this.verifyCartAndProd(cartId, prodId);
            return await cartDao.deleteProdInCart(cartId, prodId);
        } catch (error) {
            throw (error);
        }
    }

    async clearCart(cartId){
        try {
            return await cartDao.clearCart(cartId);
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = CartService;