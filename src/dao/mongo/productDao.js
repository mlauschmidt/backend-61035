const productModel = require('./models/productModel');

class ProductDaoMongo {
    async getProducts(){
        try {
            const products = await productModel.find().lean();
            return products;
        } catch (error) {
            throw (error);
        }
    }

    async getProductById(prodId){
        try {
            const product = await productModel.findById(prodId);

            if (product){
                return product;
            } else {
                throw new Error(`Producto no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async createProduct(data){
        try {
            const prodExists = await productModel.findOne({code: data.code});

            if (!prodExists){
                const newProduct = await productModel.create(data);
                return newProduct;
            } else {
                throw new Error(`Ya existe un producto con el código ${data.code}`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async updateProduct(prodId, newData){
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(prodId, newData, {new: true});
            
            if (updatedProduct){
                return updatedProduct;
            } else {
                throw new Error(`Producto no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }

    async deleteProduct(prodId){
        try {
            const deletedProduct = await productModel.findByIdAndDelete(prodId);

            if (deletedProduct){
                return { 
                    id: prodId, 
                    msg: `Producto ID ${prodId} eliminado correctamente` 
                };
            } else {
                throw new Error(`Producto no encontrado`);
            }
        } catch (error) {
            throw (error);
        }
    }
}

module.exports = ProductDaoMongo;