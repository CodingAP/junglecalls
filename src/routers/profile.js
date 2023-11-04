import { readFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import express from 'express';

import { __dirname, encryptString } from '../common.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.get('/', authenticate, async (request, response) => {
    if (!request.auth) {
        response.redirect('/');
    }

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('username', request.auth.username);

    if (error) {
        response.status(500).send('Server Error!');
        return;
    }

    response.render('profile', { data: data[0], isAdmin: request.auth.isAdmin });
});

router.get('/:user', authenticate, async (request, response) => {
    if (!request.auth) {
        response.redirect('/');
    }

    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('username', request.params.user);

    if (error) {
        response.status(500).send('Server Error!');
        return;
    }

    if (request.auth.username == request.params.user) {
        response.redirect('/profile');
    } else {
        const messagers = [request.auth.username, request.params.user].sort().join('!');
        const filename = path.join(__dirname, 'user_messages', messagers + '.log')

        let messages = [];
        if (fs.existsSync(filename)) {
            let fileResponse = await readFile(filename);
            messages = fileResponse.toString().trim().split('\n').map(m => {
                let [username, message] = m.split(': ');
                return { username, message };
            });
        }

        response.render('other-profile', {
            notFound: (data.length == 0),
            data: data[0],
            joinCode: encryptString(messagers, 'VgVKv6J4JyLqMQdLoMEE9A=='),
            oldMessages: messages.reverse()
        });
    }
});

router.post('/save-info', authenticate, async (request, response) => {
    if (!request.auth) {
        response.redirect('/');
    }

    if (request.auth.username === 'ceo-man-123' || request.auth.username === 'welcome-bot') {
        response.status(500).send('Please Don\'t Edit This!');
        return;
    }

    const { error } = await supabase
        .from('users')
        .update(request.body)
        .eq('username', request.auth.username);

    if (error) {
        response.status(500).send('Server Error!');
        return;
    }

    response.status(200).send('Updated!');
});

export default router;