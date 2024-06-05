const cartModel = require('./models/cartModel');
const ProductDaoMongo = require('./productDao');
const productDaoMongo = new ProductDaoMongo();

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
            const cart = await cartModel.findById(cartId);

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

    async updateCart(cartId, prodId){
        try {
            const cart = await this.getCartById(cartId);

            if (cart) {
                const product = await productDaoMongo.getProductById(prodId);

                if (product) {
                    const updatedCart = await cartModel.findOneAndUpdate(
                        {_id: cartId, 'products.product_id': prodId}, 
                        {$inc: {'products.$.quantity': 1}}, 
                        {new: true}
                    );

                    if (updatedCart) {
                        return updatedCart;
                    } else {
                        const updatedCart = await cartModel.findByIdAndUpdate(
                            cartId, 
                            {$push: {products: {product_id: prodId, quantity: 1}}}, 
                            {new: true}
                        );

                        return updatedCart;
                    }
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

module.exports = CartDaoMongo;