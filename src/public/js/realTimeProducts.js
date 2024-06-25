const socketClient = io();

const products = document.getElementById('productsContainer');

socketClient.on('newProduct', (product) => {
    let productHTML = `
        <div id="prod_${product._id}">
            <h3>${product.title}</h3>
            <ul>
                <li>Id: ${product._id}</li>
                <li>Categoría: ${product.category}</li>
                <li>Descripción: ${product.description}</li>
                <li>Precio: $${product.price}</li>
                <li>Código: ${product.code}</li>
                <li>Stock: ${product.stock}</li>`;
    
    product.thumbnail.forEach(image => {
        productHTML += `<img src="${image}" alt="Imagen del producto">`;
    });

    productHTML += `</ul>
                    <button id="deleteProd_${product._id}" onclick="deleteProduct('${product._id}')">ELIMINAR</button>
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

const logout = () => {
    fetch('/api/sessions/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then (() => location.assign('/login'))
    .catch (e => console.log(e))
}