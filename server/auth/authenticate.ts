import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../env';

const getAuthenticateFn =
  (required: boolean) => (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token && required) {
      res.status(401).send();
      return;
    }

    if (!token) {
      next();
      return;
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(403).send();
        return;
      }
      if (!user || typeof user === 'string') {
        res.status(404).send();
        return;
      }

      req.userId = user._id;
      next();
    });
  };

const authenticate = getAuthenticateFn(true);

export const authenticateSoft = getAuthenticateFn(false);
export default authenticate;
