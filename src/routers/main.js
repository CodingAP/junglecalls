import { __dirname } from '../common.js'
import express from 'express';
import authenticate from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, (request, response) => {
    response.render('home', { auth: request.auth });
});

router.get('/flag', authenticate, (request, response) => {
    if (!request.auth) {
        response.redirect('/');
    } else {
        if (request.auth.username == 'ap') {
            response.render('flag');
        } else {
            response.redirect('/');
        }
    }
});

router.get('/ceomanmessaging', authenticate, (request, response) => {
    if (!request.auth) {
        response.redirect('/');
    } else {
        if (request.auth.username == 'ceo-man-123') {
            response.render('ceomanmessaging');
        } else {
            response.redirect('/');
        }
    }
});

export default router;