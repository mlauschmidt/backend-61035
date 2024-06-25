const socketClient = io();

const form = document.getElementById('productForm');

form.onsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataJson = Object.fromEntries(formData.entries());
    
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJson)
    })
    .then (response => response.json())
    .then (resp => {
        if (resp._id) {
            alert('Producto cargado con éxito');
            form.reset();
        } else {
            alert(`Error: ${resp.msg}`);
        }
    })
    .catch (e => console.log(e))
}