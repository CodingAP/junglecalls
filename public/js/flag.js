const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const audio = document.querySelector('#audioContainer');
const socket = io();

let drawInterval, time = 0;

window.addEventListener('load', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
});

socket.on('SHOW_FLAG', () => {
    audio.play();

    drawInterval = setInterval(() => {
        context.fillStyle = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#fff';
        context.fillRect(canvas.width / 2 - 250, canvas.height / 2 - 150, 500, 300);
        context.fillStyle = '#000';
        context.font = '50px cursive';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('flag{ju57_a5_I_pl4nn3d_32187}', canvas.width / 2, canvas.height / 2);

        time += 100;
        if (time > 5000) {
            context.fillStyle = '#000';
            context.fillRect(0, 0, canvas.width, canvas.height);
            clearInterval(drawInterval);
            time = 0;
        }
    }, 100);
})