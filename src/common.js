import path from 'path';
import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const __dirname = path.resolve();

const encryptString = (plaintext, iv) => {
    if (iv === undefined) {
        iv = crypto.randomBytes(16);
    } else {
        iv = Buffer.from(iv, 'base64');
    }
    
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(process.env.AES_KEY, 'base64'), iv);

    let encrypted = cipher.update(plaintext, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    encrypted += '.' + iv.toString('base64');

    return encrypted;
}

const decryptString = encryptediv => {
    const [encrypted, iv] = encryptediv.split('.');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(process.env.AES_KEY, 'base64'), Buffer.from(iv, 'base64'));

    let decrypted = decipher.update(encrypted, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

export {
    __dirname,
    encryptString, decryptString
};