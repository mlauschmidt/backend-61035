const { Router } = require('express');
const cartRouter = Router();
const path = require('path');

const CartManager = require('../dao/fileSystem/cartDao');
const file = path.join(__dirname, '../dao/fileSystem/data/carts.json');
const manager = new CartManager(file);

cartRouter.get('/', async (req, res, next) => {
    try {
        const carts = await manager.getCarts();

        return res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
})

cartRouter.get('/:cid', async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await manager.getCartById(cid);
        
        return res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
})

cartRouter.post('/', async (req, res, next) => {
    try {
        const newCart = await manager.createCart();

        return res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await manager.updateCart(cid, pid);
        
        return res.status(200).json(updatedCart);
    } catch (error) {
        next(error);
    }
})

module.exports = cartRouter;