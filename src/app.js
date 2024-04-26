const express = require('express');
const app = express();

const ProductManager = require('./ProductManager');
const file = './src/products.json';
const manager = new ProductManager(file);

app.get('/products', async (req, res) => {
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

app.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await manager.getProductById(pid);
        
        if (product.id){
            return res.status(200).json(product);
        }
        
        return res.status(404).json(`Producto no encontrado`);        
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Server escuchando en puerto ${PORT}`)); 