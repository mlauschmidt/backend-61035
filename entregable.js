const fs = require('fs');

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
                id: products.length + 1, 
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
                    
                    return `Producto agregado correctamente`;
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
            const product = products.find(product => product.id === prodId);
            const prodIndex = products.findIndex(product => product.id === prodId);

            if (product){
                const updatedProduct = {
                    id: prodId, 
                    title: newData.title ?? product.title,
                    description: newData.description ?? product.description,
                    price: newData.price ?? product.price,
                    thumbnail: newData.thumbnail ?? product.thumbnail,
                    code: newData.code ?? product.code,
                    stock: newData.stock ?? product.stock
                }
                
                products.splice(prodIndex, 1, updatedProduct);
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
                    
                return `Producto modificado correctamente`;
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

//PRUEBAS

const file = './products.json';
const manager = new ProductManager(file);

const product1 = {
    title: "Remera",
    description: "Remera de morley, mangas cortas",
    price: 10,
    thumbnail: "blablabla",
    code: 123456,
    stock: 5
};

const product2 = {
    title: "Jean",
    description: "Jean oxford, tiro alto",
    price: 25,
    thumbnail: "blablabla",
    code: 123456,
    stock: 3
};

const product3 = {
    title: "Sweater",
    description: "Sweater de hilo, escote en V",
    price: 20,
    thumbnail: "blablabla",
    code: 234567,
    stock: 1
};

const product4 = {
    description: "Campera de gabardina, con capucha",
    price: 40,
    thumbnail: "blablabla",
    code: 345678,
    stock: 0
};

const product5 = {
    title: "Camisa",
    stock: 0
};

const tests = async() =>{
    console.log(await manager.getProducts());
    /* console.log(await manager.addProduct(product1));
    console.log(await manager.addProduct(product2));
    console.log(await manager.addProduct(product3));
    console.log(await manager.addProduct(product4)); 
    console.log(await manager.getProducts());
    console.log(await manager.getProductById(1));
    console.log(await manager.getProductById(5));
    console.log(await manager.updateProduct(1, product5));
    console.log(await manager.deleteProduct(2)); */
}

tests();