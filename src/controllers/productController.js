const ProductService = require('../services/productService');
const productService = new ProductService();

class ProductController {
    async getProducts (req, res, next) {
        try {            
            const { page = 1 , limit = 10, query = '', sort = ''} = req.query;
            let products = await productService.getProducts(page, limit, query, sort);

            products = {
                ...products,
                prevLink: `http://localhost:8080/api/products${products.prevLink}`,
                nextLink: `http://localhost:8080/api/products${products.nextLink}`
            };

            return res.status(200).json(products);
        } catch (error) {
            next (error);
        }
    }

    async getProductById (req, res, next) {
        try {
            const { pid } = req.params;
            const product = await productService.getProductById(pid);
            
            return res.status(200).json(product);
        } catch (error) {
            next (error);
        }
    }

    async createProduct (req, res, io, next) {
        try {
            let images = 
                !req.files ? 
                [] : 
                req.files.map(file => file.path.replace(/^.*public\\images\\/, '\\images\\'));
            let data = req.body;
            data.thumbnail = images;
            const newProduct = await productService.createProduct(data);

            io.emit('newProduct', newProduct);
    
            return res.status(201).json(newProduct);
        } catch (error) {
            next (error);
        }
    }

    async updateProduct (req, res, next) {
        try {
            const { pid } = req.params;
            const newData = req.body;
            const updatedProduct = await productService.updateProduct(pid, newData);
            
            return res.status(200).json(updatedProduct);
        } catch (error) {
            next (error);
        }
    }

    async deleteProduct (req, res, io, next) {
        try {
            const { pid } = req.params;
            const deletedProduct = await productService.deleteProduct(pid);

            io.emit('deleteProduct', deletedProduct.id);
            
            return res.status(200).json({ message: deletedProduct.msg });
        } catch (error) {
            next (error);
        }
    }
}

module.exports = ProductController;