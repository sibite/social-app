import { NextFunction, Request, Response } from 'express';
import { UserDBType } from '../api-types/auth';
import db from '../database';
import getFullName from '../shared/getFullName';
import getSrcUrl from '../shared/getSrcUrl';
import { singleCallback } from '../shared/nedbPromises';

const me = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req;

  if (!userId) {
    res.status(403).send();
    return;
  }

  try {
    const user = await new Promise<Omit<UserDBType, 'passwordHash' | 'salt'>>(
      (r, j) => {
        db.users.findOne(
          { _id: userId },
          { passwordHash: 0, salt: 0 },
          singleCallback(r, j)
        );
      }
    );

    const account = {
      ...user,
      fullName: getFullName(user),
      avatarSrc: user.avatarSrc && getSrcUrl(user.avatarSrc),
      coverSrc: user.coverSrc && getSrcUrl(user.coverSrc),
    };

    res.status(200).send(account);
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default me;
