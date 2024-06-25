const { Router } = require('express');
const viewsRouter = Router();
const ProductService = require('../services/productService');
const productService = new ProductService();

viewsRouter.get('/', async (req, res) => {
    const { page = 1 , limit = 10, query = '', sort = ''} = req.query;
    let products = await productService.getProducts(page, limit, query, sort);

    products = {
        ...products,
        prevLink: `http://localhost:8080/${products.prevLink}`,
        nextLink: `http://localhost:8080/${products.nextLink}`
    };

    res.render('home', { title: 'Home', products });
})

viewsRouter.get('/realtimeproducts', async (req, res) => {
    const { page = 1 , limit = 10, query = '', sort = ''} = req.query;
    let products = await productService.getProducts(page, limit, query, sort);
    const user = req.session.user;

    products = {
        ...products,
        prevLink: `http://localhost:8080/realtimeproducts${products.prevLink}`,
        nextLink: `http://localhost:8080/realtimeproducts${products.nextLink}`
    };

    res.render('realTimeProducts', { title: 'Real Time Products', products, user });
})

viewsRouter.get('/uploadproduct', async (req, res) => {
    res.render('uploadProduct', { title: 'Upload Product' });
})

viewsRouter.get('/chat', async (req, res) => {
    res.render('chat', { title: 'Chat' });
})

viewsRouter.get('/register', async (req, res) => {
    res.render('register', { title: 'Register' });
})

viewsRouter.get('/login', async (req, res) => {
    res.render('login', { title: 'Login' });
})

module.exports = viewsRouter;
