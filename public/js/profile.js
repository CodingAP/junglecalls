const profilePictureURLInput = document.querySelector('#profile-picture-url');
const profileStatusInput = document.querySelector('#profile-status');
const profileDescriptionTextArea = document.querySelector('#profile-description');
const profilePublicCheckbox = document.querySelector('#profile-public');
const saveResponseSpan = document.querySelector('#save-response');

window.addEventListener('load', () => {
    document.querySelector('#save-button').addEventListener('click', () => {
        fetch('/profile/save-info', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                picture_url: profilePictureURLInput.value,
                status: profileStatusInput.value,
                description: profileDescriptionTextArea.value,
                public: profilePublicCheckbox.checked
            })
        }).then(response => {
            if (response.status == 200) saveResponseSpan.innerHTML = 'saved!';
        }).catch(error => {
            console.log(error);
            saveResponseSpan.innerHTML = 'error! not saved!';
        });
    });

    document.querySelector('#logout-button').addEventListener('click', () => {
        Cookies.remove('session');
        window.location.href = window.location.origin;
    });
});