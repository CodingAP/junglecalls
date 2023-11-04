import { createClient } from '@supabase/supabase-js';
import { __dirname, encryptString } from '../common.js'
import express from 'express';
import jwt from 'jsonwebtoken';
import authenticate from '../middleware/auth.js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.get('/', authenticate, (request, response) => {
    if (request.auth) {
        response.redirect('/');
    } else {
        response.render('account');
    }
});

router.post('/signup', async (request, response) => {
    if (!request.body) {
        response.status(400).send('No information given.');
        return;
    }

    const username = request.body.username;
    const password = request.body.password;

    if (username == '' || password == '') {
        response.status(400).send('No information given.');
        return;
    }

    const { data, error } = await supabase
        .from('users')
        .select('username')
        .eq('username', username);

    if (error) {
        response.status(500).send('Server Error!');
        return;
    }

    if (data.length > 0) {
        response.status(403).send('There is already a user with that name.');
    } else {
        const insert = await supabase
            .from('users')
            .insert({
                username, password,
                picture_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png',
                description: 'default description',
                status: 'default status'
            });

        if (insert.error) {
            response.status(500).send('Server Error!');
            return;
        }

        const token = jwt.sign({ user: encryptString(username), ADMIN_MODE: false }, '', { algorithm: 'none' });
        response.status(200).setHeader('content-type', 'application/json').send({ token });
    }
});

router.post('/login', async (request, response) => {
    if (!request.body) {
        response.status(400).send('No information given.');
        return;
    }

    const username = request.body.username;
    const password = request.body.password;

    if (username == '' || password == '') {
        response.status(400).send('No information given.');
        return;
    }

    const { data, error } = await supabase
        .from('users')
        .select('username, password')
        .eq('username', username);

    if (error) {
        response.status(500).send('Server Error!');
        return;
    }

    if (data.length > 0) {
        if (data[0].password == password) {
            const token = jwt.sign({ user: encryptString(username), ADMIN_MODE: false }, '', { algorithm: 'none' });
            response.status(200).setHeader('content-type', 'application/json').send({ token });
        } else {
            response.status(403).send('Wrong password.');
        }
    } else {
        response.status(403).send('There is no user with that name.');
    }
});

export default router;