import jwt from 'jsonwebtoken';
import config from '../config/config';
import { AppSocket } from './socket-types';

const authenticateWS = (socket: AppSocket, next: (error?: any) => any) => {
  // eslint-disable-next-line prefer-destructuring
  const token: string | undefined = socket.handshake.auth.token;

  if (token) {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
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
