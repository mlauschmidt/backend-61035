const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const ProductManager = require('./productDao');
const file = path.join(__dirname, './data/products.json');
const productManager = new ProductManager(file);

class CartManager {
    constructor(path){
        this.path = path;
    }

    async getCarts(){
        try {
            if (fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(carts);
            } else {
                return [];
            }
        } catch (error) {
            throw (error);
        }
    }

    async getCartById(cartId){
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === cartId);

            if (cart){
                return cart;
            } else {
                throw new Error(`Carrito no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async createCart(){
        try {
            const carts = await this.getCarts();

            const newCart = {
                id: uuidv4(),
                products: []
            }

            carts.push(newCart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
            
            return newCart;
        } catch (error) {
            throw (error);
        }
    }

    async updateCart(cartId, prodId){
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === cartId);

            if (cart){
                const product = await productManager.getProductById(prodId);

                if (product){
                    const prodIndex = cart.products.findIndex(product => product.id === prodId);
                
                    if (prodIndex === -1){
                        cart.products.push({ 
                            id: prodId, 
                            quantity: 1 
                        })
                    } else {
                        cart.products[prodIndex].quantity ++;
                    }
                    
                    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

                    return cart;
                } else {
                    throw new Error(`Producto no encontrado`);
                }
            } else {
                throw new Error(`Carrito no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = CartManager;