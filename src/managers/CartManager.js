const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

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
            return error;
        }
    }

    async getCartById(cartId){
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === cartId);

            if (cart){
                return cart;
            } else {
                return null;
            }
        } catch (error) {
            return error;
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
            return error;
        }
    }

    async updateCart(cartId, prodId){
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === cartId);

            if (cart){
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
                return null;
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = CartManager;