import { RequestHandler } from 'express';
import { UserDBType } from '../api-types/auth';
import { PostDBType } from '../api-types/feed';
import db from '../database';
import deletePostInternal from '../feed/deletePostInternal';
import getPasswordHash from '../shared/getPasswordHash';
import {
  arrCallback,
  numCallback,
  singleCallback,
} from '../shared/nedbPromises';

const deleteAccount: RequestHandler = async (req, res) => {
  const { userId } = req;
  const { password } = req.body;

  if (!userId) return res.status(501).send();
  if (!password) return res.status(403).send();

  try {
    const user = await new Promise<Pick<UserDBType, 'salt' | 'passwordHash'>>(
      (r, j) => {
        db.users.findOne({ _id: req.userId }, singleCallback(r, j));
      }
    );

    const actualPasswordHash = user.passwordHash;
    const passwordHash = getPasswordHash(req.body.password ?? '', user.salt);

    const isAuthorized = actualPasswordHash === passwordHash;
    if (!isAuthorized) return res.status(403).send();

    await new Promise((r, j) => {
      db.comments.remove(
        { creatorId: userId },
        { multi: true },
        numCallback(r, j)
      );
    });
    const posts = await new Promise<Pick<PostDBType, '_id'>[]>((r, j) => {
      db.feed.find({ creatorId: userId }, { _id: 1 }, arrCallback(r, j));
    });

    await Promise.all(
      posts.map(async ({ _id }) => deletePostInternal(_id, userId, true))
    ).catch((e) => {
      throw new Error(e);
    });

    const deleted = await new Promise<number>((r, j) => {
      db.users.remove({ _id: userId }, numCallback(r, j));
    });
    if (deleted === 0) throw new Error('Not deleted');
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default deleteAccount;
