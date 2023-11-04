import path from 'path';
import { __dirname } from '../common.js'
import express from 'express';
import serveIndex from 'serve-index';
import authenticate from '../middleware/auth.js';

const router = express.Router();

const directory = serveIndex(path.join(__dirname, 'user_messages'));

router.get('/', authenticate, (request, response, next) => {
    if (!request.auth) {
        response.status(400).send('Your token is invalid! Try logging in again...');
        return;
    }

    if (request.auth.isAdmin) {
        directory(request, response, next);
    } else {
        response.status(403).send('Not An Admin!');
    }
});

router.get('/:file', authenticate, (request, response) => {
    if (!request.auth) {
        response.status(400).send('Your token is invalid! Try logging in again...');
        return;
    }

    if (request.auth.isAdmin) {
        response.sendFile(path.join(__dirname, 'user_messages', request.params.file));
    } else {
        response.status(403).send('Not An Admin!');
    }
})

export default router;