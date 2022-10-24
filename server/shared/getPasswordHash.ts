import crypto from 'crypto';

const getPasswordHash = (password: string, salt: string) =>
  crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('hex');

export default getPasswordHash;
