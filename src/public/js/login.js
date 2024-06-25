const emailInput = document.getElementById('emailLogin');
const passwordInput = document.getElementById('passwordLogin');
const sendButtonLogin = document.getElementById('sendButtonLogin');

sendButtonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    fetch('/api/sessions/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })  
    .then(response => response.json())
    .then(resp => {
        if (resp.msg) {
            alert(`Error: ${resp.msg}`);
        } else {
            location.assign('/realTimeProducts');
        }
    })
    .catch (e => console.log(e))
})