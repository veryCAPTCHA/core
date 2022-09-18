import crypto from 'crypto';
import config from '../data/config.json';

export function encryption(content: string) {
    const algorithm = 'aes-256-cbc';
    const key = crypto.scryptSync(config.SECURE_KEY, config.SECURE_SALT, 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(content);

    return `${iv.toString('hex')}.${Buffer.concat([encrypted, cipher.final()]).toString('hex')}`;
}

export function decryption(content: string) {
    try {
        const algorithm = 'aes-256-cbc';
        const key = crypto.scryptSync(config.SECURE_KEY, config.SECURE_SALT, 32);
        const textParts = content.split('.')
        const iv = Buffer.from(textParts.shift()!, 'hex')
        const encryptedText = Buffer.from(textParts.join('.'), 'hex')

        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        const decrypted = decipher.update(encryptedText);

        return Buffer.concat([decrypted, decipher.final()]).toString();
    } catch (e) {
        return null;
    }
}
