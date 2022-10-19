/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { rmSync } from 'fs';
import path from 'path';
import db from '../database';
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
    const post = await new Promise<any>((resolve, reject) => {
      db.feed.findOne(
        { _id: postId },
        { mediaIds: 1, mediaSrc: 1, type: 1 },
        singleCallback(resolve, reject)
      );
    });

    let media;
    let toRemoveIds: string[];

    if (!withMedia && post.type === 'post') {
      media = [];
      toRemoveIds = [postId];
    } else if (post.mediaSrc) {
      media = [{ mediaSrc: post.mediaSrc }];
      toRemoveIds = [postId];
    } else {
      media = await new Promise<any[]>((resolve, reject) => {
        db.feed.find(
          { _id: { $in: post.mediaIds }, type: 'media' },
          { mediaSrc: 1 },
          arrCallback(resolve, reject)
        );
      });
      toRemoveIds = [...media.map(({ _id }) => _id), postId];
    }

    console.log(media);

    await new Promise<number>((resolve, reject) => {
      db.feed.remove(
        { _id: { $in: toRemoveIds } },
        { multi: true },
        numCallback(resolve, reject)
      );
    });

    await new Promise<number>((resolve, reject) => {
      db.comments.remove(
        { postId: { $in: toRemoveIds } },
        { multi: true },
        numCallback(resolve, reject)
      );
    });

    media.forEach(({ mediaSrc }) => {
      console.log('removing image, ', path.join(__dirname, `../${mediaSrc}`));
      rmSync(path.join(__dirname, `../${mediaSrc}`));
    });
    res.status(200).send();
  } catch (err) {
    return res.status(500).send();
  }
};

export default deletePost;
