window.addEventListener('load', () => {
    document.querySelector('#login-button').addEventListener('click', () => {
        const username = document.querySelector('#login-username').value;
        const password = document.querySelector('#login-password').value;

        if (username == '' || password == '') {
            document.querySelector('#login-error').innerHTML = 'please enter something!!!!!!!!';
        } else {
            fetch('/account/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
                .then(response => response.json())
                .then(data => {
                    Cookies.set('session', data.token);
                    window.location.href = window.location.origin;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });

    document.querySelector('#signup-button').addEventListener('click', () => {
        const username = document.querySelector('#signup-username').value;
        const password = document.querySelector('#signup-password').value;

        if (username == '' || password == '') {
            document.querySelector('#signup-error').innerHTML = 'please enter something!!!!!!!!';
        } else {
            fetch('/account/signup', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            })
                .then(response => response.json())
                .then(data => {
                    Cookies.set('session', data.token);
                    window.location.href = window.location.origin;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });
});