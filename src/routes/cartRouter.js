const { Router } = require('express');
const cartRouter = Router();
const CartController = require('../controllers/cartController');
const cartController = new CartController();

cartRouter.get('/', cartController.getCarts);

cartRouter.get('/:cid', cartController.getCartById);

cartRouter.post('/', cartController.createCart);

cartRouter.put('/:cid/products/:pid', cartController.addProdToCart);

cartRouter.delete('/:cid/products/:pid', cartController.deleteProdInCart);

cartRouter.delete('/:cid', cartController.clearCart);

module.exports = cartRouter;