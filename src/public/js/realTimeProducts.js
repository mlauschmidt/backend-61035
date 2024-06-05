const socketClient = io();

const products = document.getElementById('productsContainer');

socketClient.on('newProduct', (product) => {
    let productHTML = `
        <div id="prod_${product.id}">
            <h3>${product.title}</h3>
            <ul>
                <li>Id: ${product.id}</li>
                <li>Categoría: ${product.category}</li>
                <li>Descripción: ${product.description}</li>
                <li>Precio: $${product.price}</li>
                <li>Código: ${product.code}</li>
                <li>Stock: ${product.stock}</li>`;
    
    product.thumbnail.forEach(image => {
        productHTML += `<img src="${image}" alt="Imagen del producto">`;
    });

    productHTML += `</ul>
                    <button id="deleteProd_${product.id}" onclick="deleteProduct('${product.id}')">ELIMINAR</button>
                </div>`;
    
    products.innerHTML += productHTML;
})

const deleteProduct = (prodId) => {
    fetch(`/api/products/${prodId}`, {
        method: 'DELETE'
    })
    .then (response => response.json())
    .then (resp => {
        if (resp.message) {
            alert(resp.message);
        } else {
            alert(`Error: ${resp.msg}`);
        }
    })
    .catch (e => console.log(e))
}

socketClient.on('deleteProduct', (id) => {
    const prodId = document.getElementById(`prod_${id}`);

    productsContainer.removeChild(prodId);
})