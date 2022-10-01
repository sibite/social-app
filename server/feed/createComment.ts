/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import db from '../database';
import { singleCallback } from '../shared/nedbPromises';

const createComment: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req;
  const { content } = req.body;

  if (!(postId && userId && content !== undefined))
    return res.status(500).send();
  if (content === '') return res.status(400).send();

  try {
    await new Promise((r, j) => {
      db.comments.insert(
        { postId, creatorId: userId, content, date: Date.now() },
        singleCallback(r, j)
      );
    });

    res.status(201).send();
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default createComment;
