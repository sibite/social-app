import { NextFunction, Request, Response } from 'express';
import db from '../database/database';
import getFullName from '../shared/getFullName';
import getSrcUrl from '../shared/getSrcUrl';

const me = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req;

  if (!userId) {
    res.status(403).send();
    return;
  }

  db.users.findOne(
    { _id: userId },
    { passwordHash: 0, salt: 0 },
    (err, user) => {
      if (err) {
        res.status(500).send();
        return;
      }
      if (!user) {
        res.status(404).send();
        return;
      }

      const account = {
        ...user,
        fullName: getFullName(user),
        avatarSrc: getSrcUrl(user.avatarSrc),
        coverSrc: getSrcUrl(user.coverSrc),
      };

      res.status(200).send(account);
    }
  );
};

export default me;
