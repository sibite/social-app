/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import db from '../database';
import { updateCallback, numCallback } from '../shared/nedbPromises';

const togglePostLike: RequestHandler = async (req, res) => {
  const { postId } = req.params;

  if (!postId) return res.status(501).send();

  try {
    const likedPost = await new Promise<any>((resolve, reject) => {
      db.feed.count(
        { _id: postId, likedBy: { $elemMatch: req.userId } },
        numCallback(resolve, reject)
      );
    });

    const operator = likedPost ? '$pull' : '$push';

    await new Promise<any>((resolve, reject) => {
      db.feed.update(
        { _id: postId },
        { [operator]: { likedBy: req.userId } },
        {},
        updateCallback(resolve, reject)
      );
    });

    res.status(201).send();
  } catch (err) {
    res.status(500).send();
  }
};

export default togglePostLike;
