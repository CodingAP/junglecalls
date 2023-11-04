const currentMessageText = document.querySelector('#current-message');
const messagesList = document.querySelector('#messages');
const socket = io();

window.addEventListener('load', () => {
    socket.emit('JOIN_PRIVATE_MESSAGE', C);
    fetch('/user_messages').then(response => {}).catch(error => {});

    document.querySelector('#send-button').addEventListener('click', () => {
        if (currentMessageText.value != '') {
            socket.emit('SEND_PRIVATE_MESSAGE', Cookies.get('session'), C, currentMessageText.value);
            currentMessageText.value = '';
        }
    });

    socket.on('RECEIVE_PRIVATE_MESSAGE', (username, message, code) => {
        if (code == C) {
            addMessage(username, message);
        }
    });
});

const addMessage = (username, message) => {
    const newMessageItem = document.createElement('li');
    newMessageItem.innerHTML = `<a class="profile-link" href="/profile/${username}">${username}<a>: <span class="message-text">${message}</span>`;
    messagesList.prepend(newMessageItem);
}