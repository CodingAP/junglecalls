import fs from 'fs';
import path from 'path';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { random as randomEmoji } from 'node-emoji';

import { decryptString , __dirname } from './common.js';

/**
 * just doing this for autocomplete
 * @param {Server} io 
 */
const setupMessager = io => {
    let lastEmojiTime = 0;

    io.on('connection', socket => {
        socket.on('JOIN_GLOBAL_MESSAGE', token => {
            try {
                const decoded = jwt.decode(token);
                io.emit('RECEIVE_GLOBAL_MESSAGE', 'welcome-bot', `welcome ${decryptString(decoded.user)}! the current time is ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}!`);
            } catch (error) { }
        });

        socket.on('SEND_GLOBAL_MESSAGE', (token, message) => {
            try {
                const decoded = jwt.decode(token);
                io.emit('RECEIVE_GLOBAL_MESSAGE', decryptString(decoded.user), message);
            } catch (error) {}
        });

        socket.on('SEND_GLOBAL_MESSAGE_RANDOM', (token, message) => {
            try {
                const decoded = jwt.decode(token);
                io.emit('RECEIVE_GLOBAL_MESSAGE_EMOJI', decryptString(decoded.user), randomEmoji().emoji);

                let newTime = new Date().getTime();
                if (newTime - lastEmojiTime > 5000) {
                    lastEmojiTime = newTime;
                    io.emit('SHOW_FLAG');
                }
            } catch (error) { }
        });

        socket.on('JOIN_PRIVATE_MESSAGE', code => {
            socket.join(code);
        });

        socket.on('SEND_PRIVATE_MESSAGE', (token, code, message) => {
            let [messager1, messager2] = decryptString(code).split('!');
            try {
                const decoded = jwt.decode(token);
                const username = decryptString(decoded.user);
                
                sendPrivateMessage(io, username, message, code);

                // automated messages
                if (messager1 == 'ceo-man-123' || messager2 == 'ceo-man-123') {
                    sendPrivateMessage(io, 'ceo-man-123', 'HELLO! THIS IS AN AUTOMATED MESSAGE TO TELL YOU TO NOT MESSAGE ME! I HAVE NO INFORMATION TO HELP YOU...', code);
                }

                if (messager1 == 'welcome-bot' || messager2 == 'welcome-bot') {
                    if (message.includes('wrong')) {
                        sendPrivateMessage(io, 'welcome-bot', 'hello! i think your messaging me because my time is wrong. i\'m sorry, let me make it up to you...', code);
                        sendPrivateMessage(io, 'welcome-bot', 'flag{c10ck_m4y_b3_wr0ng_74392}', code);
                    } else {
                        sendPrivateMessage(io, 'welcome-bot', 'hello! i am a bot!', code);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
}

const sendPrivateMessage = (io, from, message, code) => {
    let dir = path.join(__dirname, 'user_messages');
    let data = `${from}: ${message}\n`;

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let filename = path.join(dir, decryptString(code) + '.log');

    if (!fs.existsSync(filename)) {
        fs.writeFile(filename, data, (err) => {
            if (err) console.log(err)
            else console.log(`${filename}, ${data}`);
        })
    } else {
        fs.appendFile(filename, data, (err) => {
            if (err) console.log(err)
            else console.log(`${filename}, ${data}`);
        });
    }

    io.to(code).emit('RECEIVE_PRIVATE_MESSAGE', from, message, code);
}

export default setupMessager;