/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import db from '../database';
import { numCallback } from '../shared/nedbPromises';

const deleteComment: RequestHandler = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req;

  if (!commentId) return res.status(500).send();

  try {
    await new Promise<number>((r, j) => {
      db.comments.remove(
        { _id: commentId, creatorId: userId },
        numCallback(r, j)
      );
    });

    res.status(200).send();
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default deleteComment;
