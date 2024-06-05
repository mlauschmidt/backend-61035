const socketClient = io();

socketClient.on('messages', (messages) => {
    messages.map((message) => {
        output.innerHTML += `<p><strong>${message.user}</strong>: ${message.message}</p>`
    }).join(' ');
})

let user = null;

if(!user) {
    Swal.fire({
      title: "¡Bienvenid@ al chat!",
      inputLabel: "Ingresa tu nombre:",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar tu nombre";
        }
      }
    }).then((input) => {
        user = input.value;
        socketClient.emit('newUser', user);
    });
}

const output = document.getElementById('output');
const actions = document.getElementById('actions');
const message = document.getElementById('messageInput');
const btn = document.getElementById('sendButton');

btn.addEventListener('click', () => {
    socketClient.emit('newMessage', {
        user,
        message: message.value
    });

    message.value = '';
})

socketClient.on('message', (message) => {
    output.innerHTML += `<p><strong>${message.user}</strong>: ${message.message}</p>`;

    actions.innerHTML = '';
})

socketClient.on('newUser', (user) => {
    Toastify({
        text: `${user} ha iniciado sesión`,
        duration: 3000,
        gravity: "top", 
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, blueviolet, grey)"
        }
      }).showToast();
})

message.addEventListener('keypress', () => {
    socketClient.emit('userTyping', user);
})

socketClient.on('userTyping', (user)=>{
    actions.innerHTML = `<p>${user} está escribiendo...</p>`;
})