import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../env';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    if (!user || typeof user === 'string') {
      res.sendStatus(404);
      return;
    }

    req.userId = user._id;
    next();
  });
};

export default authenticate;
