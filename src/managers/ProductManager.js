const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class ProductManager {
    constructor(path){
        this.path = path;
    }

    async getProducts(){
        try {
            if (fs.existsSync(this.path)){
                const products = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(products);
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }

    async getProductById(prodId){
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === prodId);

            if (product){
                return product;
            } else {
                return null;
            }
        } catch (error) {
            return error;
        }
    }

    async createProduct(data){
        try {
            const products = await this.getProducts();

            const newProduct = {
                id: uuidv4(),
                ...data,
                status: true
            }

            const prodIndex = products.findIndex(product => product.code === data.code);

            if (prodIndex === -1){
                products.push(newProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                
                return newProduct;
            } else {
                return { msg: `Ya existe un producto con el código ${data.code}` };
            }
        } catch (error) {
            return error;
        }
    }

    async updateProduct(prodId, newData){
        try {
            const products = await this.getProducts();
            const prodIndex = products.findIndex(product => product.id === prodId);

            if (prodIndex !== -1){
                const updatedProduct = {
                    ...products[prodIndex], 
                    ...newData,
                    id: prodId
                }

                products.splice(prodIndex, 1, updatedProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                    
                return updatedProduct;
            } else {
                return null;
            }
        } catch (error) {
            return error;
        }
    }

    async deleteProduct(prodId){
        try {
            const products = await this.getProducts();
            const prodIndex = products.findIndex(product => product.id === prodId);

            if (prodIndex !== -1){                
                products.splice(prodIndex, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                    
                return { msg: `Producto eliminado correctamente` };
            } else {
                return null;
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = ProductManager;