const socketClient = io();

const form = document.getElementById('productForm');

form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    fetch(`/api/products`, {
        method: 'POST',
        body: formData
    })
    .then (response => response.json())
    .then (resp => {
        if (resp.id) {
            alert('Producto cargado con éxito');
            form.reset();
        } else {
            alert(`Error: ${resp.msg}`);
        }
    })
    .catch (e => console.log(e))
}