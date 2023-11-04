const messagesList = document.querySelector('#messages');
const socket = io();

window.addEventListener('load', () => {
    socket.on('RECEIVE_CEO_MESSAGE', (username, message) => {
        const newMessageItem = document.createElement('li');
        newMessageItem.innerHTML = `<a class="profile-link" href="/profile/${username}">${username}<a>: <span class="message-text">${message}</span>`;
        messagesList.prepend(newMessageItem);
    });
});