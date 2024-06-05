const { Router } = require('express');
const cartRouter = Router();
const CartController = require('../controllers/cartController');
const cartController = new CartController();

cartRouter.get('/', cartController.getCarts);

cartRouter.get('/:cid', cartController.getCartById);

cartRouter.post('/', cartController.createCart);

cartRouter.post('/:cid/product/:pid', cartController.updateCart);

module.exports = cartRouter;