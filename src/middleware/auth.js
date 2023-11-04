import jwt from 'jsonwebtoken';
import { decryptString } from '../common.js';

const authenticate = (request, response, next) => {
    if (!request.cookies.session) request.auth = null;

    try {
        const decoded = jwt.decode(request.cookies.session);
        request.auth = { username: decryptString(decoded.user), isAdmin: decoded.ADMIN_MODE };
    } catch (error) {
        request.auth = null;
    }

    next();
}

export default authenticate;