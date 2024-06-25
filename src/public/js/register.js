const form = document.getElementById('registerForm');

form.onsubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const formDataJson = Object.fromEntries(formData.entries());

    fetch('/api/sessions/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataJson)
    })
    .then (response => response.json())
    .then (resp => {
        if (resp.msg) {
            alert(`Error: ${resp.msg}`);
        } else {
            alert('Usuario registrado con éxito');
            location.assign('/login');
        }
    })
    .catch (e => console.log(e))
}