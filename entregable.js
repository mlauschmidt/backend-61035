class ProductManager {
    constructor(){
        this.products = [];
    }

    addProduct(data){
        const newProduct = {
            id: this.products.length + 1,
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnail: data.thumbnail,
            code: data.code,
            stock: data.stock
        }

        const dataEntries = Object.values(newProduct);

        if (!dataEntries.includes(undefined)){
            const productExists = this.products.findIndex(product => product.code === data.code);

            if (productExists === -1){
                this.products.push(newProduct);
                return `Producto agregado correctamente`;
            } else {
                return `Ya existe un producto con el código ${data.code}`;
            }
        } else {
            return `Todos los campos son obligatorios`;
        }
    }

    getProducts(){
        return this.products;
    }

    getProductById(prodId){
        const product = this.products.find(product => product.id === prodId);

        if (product){
            return product;
        } else {
            return `Not found`;
        }
    }

}

//PRUEBAS

const manager = new ProductManager();
console.log(manager.products);

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

console.log(manager.addProduct(product1));
console.log(manager.addProduct(product2));
console.log(manager.addProduct(product3));
console.log(manager.addProduct(product4));

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(5));