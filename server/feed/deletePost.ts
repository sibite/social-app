/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { rmSync } from 'fs';
import path from 'path';
import db from '../database/database';
import {
  arrCallback,
  numCallback,
  singleCallback,
} from '../shared/nedbPromises';

const deletePost: RequestHandler = async (req, res) => {
  const { postId } = req.params;
  const { withMedia } = req.body;

  if (!postId) {
    return res.status(501).send();
  }

  try {
    if (!withMedia) {
      const num = await new Promise<number>((resolve, reject) => {
        db.feed.remove({ _id: postId }, numCallback(resolve, reject));
      });
      if (num === 0) return res.status(404).send();
    }

    const post = await new Promise<any>((resolve, reject) => {
      db.feed.findOne(
        { _id: postId },
        { mediaIds: 1 },
        singleCallback(resolve, reject)
      );
    });

    const media = await new Promise<any[]>((resolve, reject) => {
      db.media.find(
        { _id: { $in: post.mediaIds } },
        { src: 1 },
        arrCallback(resolve, reject)
      );
    });

    const mediaIds = media.map(({ _id }) => _id);

    await new Promise<number>((resolve, reject) => {
      db.feed.remove({ _id: postId }, numCallback(resolve, reject));
    });

    await new Promise<number>((resolve, reject) => {
      db.media.remove({ _id: { $in: mediaIds } }, numCallback(resolve, reject));
    });

    media.forEach(({ src }) => {
      rmSync(path.join(__dirname, `../${src}`));
    });

    res.send(200).send();
  } catch (err) {
    return res.status(500).send();
  }
};

export default deletePost;
