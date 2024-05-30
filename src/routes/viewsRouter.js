const { Router } = require('express');
const viewsRouter = Router();
const path = require('path');

const ProductManager = require('../dao/fileSystem/productDao');
const file = path.join(__dirname, '../dao/fileSystem/data/products.json');
const productManager = new ProductManager(file);

viewsRouter.get('/', async (req, res) => {
    const products = await productManager.getProducts();

    res.render('home', { title: 'Home', products: products });
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();

    res.render('realTimeProducts', { title: 'Real Time Products', products: products });
})

viewsRouter.get('/uploadproduct', async (req, res) => {
    res.render('uploadProduct', { title: 'Upload Product' });
})

module.exports = viewsRouter;
