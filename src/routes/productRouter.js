const { Router } = require('express');
const productRouter = Router();
const path = require('path');
const uploader = require('../middlewares/multer');

const ProductManager = require('../managers/ProductManager');
const file = path.join(__dirname, '../data/products.json');
const manager = new ProductManager(file);

const dataValidator = require('../middlewares/dataValidator');

productRouter.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        const { limit } = req.query;

        if (limit){
            const limitedList = products.slice(0, limit);
            return res.status(200).json(limitedList);
        }

        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

productRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await manager.getProductById(pid);
        
        if (!product){
            return res.status(404).json({ msg: `Producto no encontrado` }); 
        }
        
        return res.status(200).json(product);       
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

productRouter.post('/', uploader.array('images'), dataValidator, async (req, res) => {
    try {
        let images = !req.files ? [] : req.files.map(file => file.path);
        let data = req.body;
        data.thumbnail = images;
        const newProduct = await manager.createProduct(data);

        if (newProduct.msg){
            return res.status(400).json({ msg: newProduct.msg });
        }
        
        return res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

productRouter.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const data = req.body;
        const updatedProduct = await manager.updateProduct(pid, data);

        if (!updatedProduct){
            return res.status(404).json({ msg: `Producto no encontrado` });
        }
        
        return res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

productRouter.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await manager.deleteProduct(pid);
        
        if (!product){
            return res.status(404).json({ msg: `Producto no encontrado` }); 
        }
        
        return res.status(200).json({ msg: product.msg });     
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

module.exports = productRouter;