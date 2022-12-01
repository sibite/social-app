import { existsSync, rmSync } from 'fs';
import path from 'path';
import db from '../database';
import ensureDirExists from '../shared/directoryUtils';
import {
  arrCallback,
  numCallback,
  singleCallback,
} from '../shared/nedbPromises';

const deletePostInternal = async (
  postId: string,
  userId: string,
  withMedia: boolean
) => {
  try {
    const post = await new Promise<any>((resolve, reject) => {
      db.feed.findOne(
        { _id: postId, creatorId: userId },
        { mediaIds: 1, mediaSrc: 1, type: 1 },
        singleCallback(resolve, reject)
      );
    });

    let media = [];
    const toRemoveIds: string[] = [postId];

    if (post.mediaSrc) {
      media.push({ mediaSrc: post.mediaSrc });
    }
    if (withMedia) {
      const postMedia = await new Promise<any[]>((resolve, reject) => {
        db.feed.find(
          { _id: { $in: post.mediaIds }, type: 'media' },
          { mediaSrc: 1 },
          arrCallback(resolve, reject)
        );
      });
      media = postMedia.concat(media);
      toRemoveIds.unshift(...postMedia.map(({ _id }) => _id));
    }

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
      const srcPath = path.join(
        __dirname,
        `../../database/uploads/${mediaSrc}`
      );
      if (existsSync(srcPath)) rmSync(srcPath);
    });
    return;
  } catch (err) {
    return Promise.reject(err);
  }
};

export default deletePostInternal;
