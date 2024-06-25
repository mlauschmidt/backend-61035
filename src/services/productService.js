/* const path = require('path');
const ProductDaoFS = require('../dao/fileSystem/productDao');
const file = path.join(__dirname, '../dao/fileSystem/data/products.json');
const productDao = new ProductDaoFS(file); */
const ProductDaoMongo = require('../dao/mongo/productDao');
const productDao = new ProductDaoMongo();

class ProductService {
    async getProducts (page, limit, query, sort) {
        try {
            let products = await productDao.getProducts(page, limit, query, sort);

            const prev = products.hasPrevPage === true ? 
                        `?page=${products.prevPage}&limit=${limit}&query=${query}&sort=${sort}` : 
                        null;

            const next = products.hasNextPage === true ? 
                        `?page=${products.nextPage}&limit=${limit}&query=${query}&sort=${sort}` : 
                        null;

            return products = {
                /* status: success */
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: prev,
                nextLink: next
            };
        } catch (error) {
            throw (error);
        }
    }

    async getProductById (prodId) {
        try {
            return await productDao.getProductById(prodId);
        } catch (error) {
            throw (error);
        }
    }

    async createProduct (data) {
        try {
            return await productDao.createProduct(data);
        } catch (error) {
            throw (error);
        }
    }

    async updateProduct (prodId, newData) {
        try {
            return await productDao.updateProduct(prodId, newData);
        } catch (error) {
            throw (error);
        }
    }

    async deleteProduct (prodId) {
        try {
            return await productDao.deleteProduct(prodId);
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = ProductService;