const { Router } = require('express');
const productRouter = Router();
const path = require('path');
const uploader = require('../middlewares/multer');

const ProductManager = require('../dao/fileSystem/productDao');
const file = path.join(__dirname, '../dao/fileSystem/data/products.json');
const manager = new ProductManager(file);

const productValidator = require('../middlewares/productValidator');

const productRouterFn = (io) => {
    productRouter.get('/', async (req, res, next) => {
        try {
            const products = await manager.getProducts();
            const { limit } = req.query;
    
            if (limit){
                const limitedList = products.slice(0, limit);
                return res.status(200).json(limitedList);
            }
    
            return res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    })
    
    productRouter.get('/:pid', async (req, res, next) => {
        try {
            const { pid } = req.params;
            const product = await manager.getProductById(pid);
            
            return res.status(200).json(product);       
        } catch (error) {
            next(error);
        }
    })
    
    productRouter.post('/', uploader.array('images'), productValidator, async (req, res, next) => {
        try {
            let images = 
                !req.files ? 
                [] : 
                req.files.map(file => file.path.replace(/^.*public\\images\\/, '\\images\\'));
            let data = req.body;
            data.thumbnail = images;
            const newProduct = await manager.createProduct(data);

            io.emit('producto_nuevo', newProduct);
    
            return res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    })
    
    productRouter.put('/:pid', async (req, res, next) => {
        try {
            const { pid } = req.params;
            const data = req.body;
            const updatedProduct = await manager.updateProduct(pid, data);
            
            return res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    })
    
    productRouter.delete('/:pid', async (req, res, next) => {
        try {
            const { pid } = req.params;
            const response = await manager.deleteProduct(pid);

            io.emit('producto_eliminado', response.id);
            
            return res.status(200).json({ message: response.msg });     
        } catch (error) {
            next(error);
        }
    })

    return productRouter;
}

module.exports = productRouterFn;