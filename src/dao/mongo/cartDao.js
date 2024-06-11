const cartModel = require('./models/cartModel');

class CartDaoMongo {
    async getCarts(){
        try {
            const carts = await cartModel.find();
            return carts;
        } catch (error) {
            throw (error);
        }
    }

    async getCartById(cartId){
        try {
            const cart = await cartModel.findById(cartId).populate('products.product');

            if (cart) {
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
            const newCart = await cartModel.create({});
            return newCart;
        } catch (error) {
            throw (error);
        }
    }

    async addProdToCart(cartId, prodId, qty){
        try {
            const quantity = qty ? {$set: {'products.$.quantity': qty}} : {$inc: {'products.$.quantity': 1}}; 

            const updatedCart = await cartModel.findOneAndUpdate(
                {_id: cartId, 'products.product': prodId}, 
                quantity, 
                {new: true}
            );

            if (updatedCart) {
                return updatedCart;
            } else {
                const updatedCart = await cartModel.findByIdAndUpdate(
                    cartId, 
                    {$push: {products: {product: prodId, quantity: qty || 1}}}, 
                    {new: true}
                );

                return updatedCart;
            }
        } catch (error) {
            throw (error);
        }
    }

    async deleteProdInCart (cartId, prodId) {
        try {
            const updatedCart = await cartModel.findOneAndUpdate(
                {_id: cartId, 'products.product': prodId}, 
                {$pull: {products: {product: prodId}}}, 
                {new: true}
            );

            if (updatedCart) {
                return { 
                    id: {cartId, prodId}, 
                    msg: `Producto ID ${prodId} eliminado correctamente del carrito` 
                };
            } else {
                throw new Error(`Producto no encontrado en este carrito`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async clearCart (cartId) {
        try {
            const clearedCart = await cartModel.findByIdAndUpdate(cartId, {$set: {products: []}}, {new: true});

            if (clearedCart){
                return { 
                    id: cartId, 
                    msg: `Carrito ID ${cartId} vaciado correctamente` 
                };
            } else {
                throw new Error(`Carrito no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = CartDaoMongo;