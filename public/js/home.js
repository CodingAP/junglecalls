window.addEventListener('load', () => {
    document.querySelector('#goto-login').addEventListener('click', () => {
        window.location.href = window.location.origin + '/account'
    });
});