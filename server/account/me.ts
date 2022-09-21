import { NextFunction, Request, Response } from 'express';
import db from '../database/database';
import getFullName from '../shared/getFullName';

const me = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req;

  if (!userId) {
    res.sendStatus(403);
    return;
  }

  db.users.findOne(
    { _id: userId },
    { passwordHash: 0, salt: 0 },
    (err, user) => {
      if (err) {
        res.sendStatus(500);
        return;
      }
      if (!user) {
        res.sendStatus(404);
        return;
      }

      const account = { ...user, fullName: getFullName(user) };

      res.status(200).send(account);
    }
  );
};

export default me;
