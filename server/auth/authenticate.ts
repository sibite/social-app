import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../env';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).send();
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

export default authenticate;
