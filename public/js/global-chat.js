const currentMessageText = document.querySelector('#current-message');
const messagesList = document.querySelector('#messages');
const socket = io();

window.addEventListener('load', () => {
    console.log('~~~~ initializing global chat ~~~~');
    console.log('[##                              ]');
    console.log('[####                            ]');
    console.log('[######                          ]');
    console.log('[########                        ]');
    console.log('[##########                      ]');
    console.log('[############                    ]');
    console.log('[##############                  ]');
    console.log('[################                ]');
    console.log('[##################              ]');
    console.log('[####################            ]');
    console.log('[######################          ]');
    console.log('[########################        ]');
    console.log('[##########################      ]');
    console.log('[############################    ]');
    console.log('[##############################  ]');
    console.log('[################################]');

    socket.emit('JOIN_GLOBAL_MESSAGE', Cookies.get('session'));

    document.querySelector('#send-button').addEventListener('click', () => {
        if (currentMessageText.value != '') {
            socket.emit('SEND_GLOBAL_MESSAGE', Cookies.get('session'), currentMessageText.value);
            currentMessageText.value = '';
        }
    });

    document.querySelector('#send-random-button').addEventListener('click', () => {
        socket.emit('SEND_GLOBAL_MESSAGE_RANDOM', Cookies.get('session'));
    });

    socket.on('RECEIVE_GLOBAL_MESSAGE', (username, message) => {
        addMessage(username, message, false);
    });

    socket.on('RECEIVE_GLOBAL_MESSAGE_EMOJI', (username, message) => {
        addMessage(username, message, true);
    });
});

const addMessage = (username, message, emoji) => {
    const newMessageItem = document.createElement('li');
    newMessageItem.innerHTML = `<a class="profile-link" href="/profile/${username}">${username}<a>: <span class="message-text${emoji ? ' is-emoji' : ''}">${message}</span>`;
    messagesList.prepend(newMessageItem);
}