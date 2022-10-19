import { RequestHandler } from 'express';
import { PostDBType } from '../api-types/feed';
import db from '../database';
import { numCallback, singleCallback } from '../shared/nedbPromises';
import saveImage from '../shared/saveImage';

const putCover: RequestHandler = async (req, res) => {
  try {
    const coverSrc = await new Promise<string>((resolve, reject) => {
      saveImage(
        req,
        {
          storagePath: `${req.userId}/covers`,
          fieldKey: 'cover',
          maxPixelSize: 2000,
          quality: 97,
        },
        (err, coverSrcRes) =>
          err || !coverSrcRes ? reject(err?.code) : resolve(coverSrcRes)
      );
    });

    await new Promise<number>((r, j) => {
      db.users.update(
        { _id: req.userId },
        { $set: { coverSrc } },
        {},
        numCallback(r, j)
      );
    });

    const newMedia: Partial<PostDBType> = {
      creatorId: req.userId,
      date: Date.now(),
      mediaSrc: coverSrc,
      type: 'media',
    };

    await new Promise((r, j) => {
      db.feed.insert(newMedia, singleCallback(r, j));
    });

    res.status(201).send();
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default putCover;
