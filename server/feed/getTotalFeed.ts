/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { UserType } from '../api-types/auth';
import { PostDBType } from '../api-types/feed';
import db from '../database';
import { arrCallback, singleCallback } from '../shared/nedbPromises';

const getTotalFeed: RequestHandler = async (req, res) => {
  const { userId } = req;

  if (!userId) return res.status(501).send();

  try {
    const userRes = await new Promise<Pick<UserType, '_id' | 'following'>>(
      (r, j) => {
        db.users.findOne(
          { _id: userId },
          { following: 1 },
          singleCallback(r, j)
        );
      }
    );

    const followingIds = userRes.following ?? [];
    followingIds.push(userId);

    const postsRes = await new Promise<Pick<PostDBType, '_id'>[]>((r, j) => {
      db.feed
        .find({ creatorId: { $in: followingIds }, type: 'post' }, { _id: 1 })
        .sort({ date: -1 })
        .exec(arrCallback(r, j));
    });

    const posts = postsRes.map(({ _id }) => _id);

    res.status(200).send(posts);
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500);
  }
};

export default getTotalFeed;
