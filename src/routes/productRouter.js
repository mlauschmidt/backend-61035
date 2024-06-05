const { Router } = require('express');
const productRouter = Router();
const uploader = require('../middlewares/multer');
const productValidator = require('../middlewares/productValidator');
const ProductController = require('../controllers/productController');
const productController = new ProductController();

const productRouterFn = (io) => {
    productRouter.get('/', productController.getProducts);
    
    productRouter.get('/:pid', productController.getProductById);
    
    productRouter.post('/', 
        uploader.array('images'), 
        productValidator, 
        (req, res, next) => {
            productController.createProduct(req, res, io, next);
        }
    );
    
    productRouter.put('/:pid', productController.updateProduct);
    
    productRouter.delete('/:pid', (req, res, next) => {
        productController.deleteProduct(req, res, io, next);
    });

    return productRouter;
}

module.exports = productRouterFn;