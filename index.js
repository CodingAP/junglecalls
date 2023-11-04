import express from 'express';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { __dirname } from './src/common.js';
import mainRouter from './src/routers/main.js';
import accountRouter from './src/routers/account.js';
import profileRouter from './src/routers/profile.js';
import messagesRouter from './src/routers/messages.js';
import setupMessager from './src/messager.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.use('/', mainRouter);
app.use('/account', accountRouter);
app.use('/profile', profileRouter);
app.use('/user_messages', messagesRouter);
app.use('/js', express.static(path.join(__dirname, '/public/js')));
app.use('/images', express.static(path.join(__dirname, '/public/images')));
app.use('/styles', express.static(path.join(__dirname, '/public/styles')));
app.use('/sounds', express.static(path.join(__dirname, '/public/sounds')));

setupMessager(io);

const PORT = process.env.PORT || 1337;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
