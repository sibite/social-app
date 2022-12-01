/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import deletePostInternal from './deletePostInternal';

const deletePost: RequestHandler = async (req, res) => {
  const { userId } = req;
  const { postId } = req.params;
  const { withMedia } = req.body;

  if (!postId || !userId) {
    return res.status(501).send();
  }

  try {
    await deletePostInternal(postId, userId, withMedia);
    res.status(200).send();
  } catch (err) {
    return res.status(500).send();
  }
};

export default deletePost;
