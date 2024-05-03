const { Router } = require('express');
const cartRouter = Router();
const path = require('path');

const CartManager = require('../managers/CartManager');
const file = path.join(__dirname, '../data/carts.json');
const manager = new CartManager(file);

cartRouter.get('/', async (req, res) => {
    try {
        const carts = await manager.getCarts();
        return res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

cartRouter.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await manager.getCartById(cid);
        
        if (!cart){
            return res.status(404).json({ msg: `Carrito no encontrado` }); 
        }
        
        return res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

cartRouter.post('/', async (req, res) => {
    try {
        const newCart = await manager.createCart();

        return res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await manager.updateCart(cid, pid);

        if (!updatedCart){
            return res.status(404).json({ msg: `Carrito no encontrado` });
        }
        
        return res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

module.exports = cartRouter;