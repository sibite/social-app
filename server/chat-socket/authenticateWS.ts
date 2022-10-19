import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../env';
import { AppSocket } from './socket-types';

const authenticateWS = (socket: AppSocket, next: (error?: any) => any) => {
  // eslint-disable-next-line prefer-destructuring
  const token: string | undefined = socket.handshake.auth.token;

  if (token) {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (!err && user && typeof user !== 'string') {
        socket.data.userId = user._id;
      }
      next();
    });
  } else {
    next();
  }
};

export default authenticateWS;
