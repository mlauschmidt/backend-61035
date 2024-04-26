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

    async addProduct(data){
        try {
            const products = await this.getProducts();

            const newProduct = {
                id: uuidv4(), 
                title: data.title,
                description: data.description,
                price: data.price,
                thumbnail: data.thumbnail,
                code: data.code,
                stock: data.stock
            }

            const dataEntries = Object.values(newProduct);

            if (!dataEntries.includes(undefined)){
                const productExists = products.findIndex(product => product.code === data.code);

                if (productExists === -1){
                    products.push(newProduct);
                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                    
                    console.log(`Producto creado correctamente`);
                    return newProduct;
                } else {
                    return `Ya existe un producto con el código ${data.code}`;
                }
            } else {
                return `Todos los campos son obligatorios`;
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
                return `Producto no encontrado`;
            }
        } catch (error) {
            return error;
        }
    }

    async updateProduct(prodId, newData){
        try {
            const products = await this.getProducts();
            const product = await this.getProductById(prodId);
            const prodIndex = products.findIndex(product => product.id === prodId);

            if (product.id){
                const updatedProduct = {
                    ...product, 
                    ...newData,
                    id: prodId
                }
                
                products.splice(prodIndex, 1, updatedProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                    
                return updatedProduct;
            } else {
                return `Producto no encontrado`;
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
                    
                return `Producto eliminado correctamente`;
            } else {
                return `Producto no encontrado`;
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = ProductManager;