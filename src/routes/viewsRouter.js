const { Router } = require('express');
const viewsRouter = Router();
const ProductService = require('../services/productService');
const productService = new ProductService();

viewsRouter.get('/', async (req, res) => {
    const products = await productService.getProducts();
    res.render('home', { title: 'Home', products });
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productService.getProducts();
    res.render('realTimeProducts', { title: 'Real Time Products', products });
})

viewsRouter.get('/uploadproduct', async (req, res) => {
    res.render('uploadProduct', { title: 'Upload Product' });
})

viewsRouter.get('/chat', async (req, res) => {
    res.render('chat', { title: 'Chat' });
})

module.exports = viewsRouter;
