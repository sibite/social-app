import { RequestHandler } from 'express';
import { PostDBType } from '../api-types/feed';
import db from '../database';
import { numCallback, singleCallback } from '../shared/nedbPromises';
import saveImage from '../shared/saveImage';

const putAvatar: RequestHandler = async (req, res) => {
  try {
    const avatarSrc = await new Promise<string>((resolve, reject) => {
      saveImage(
        req,
        {
          storagePath: `${req.userId}/avatars`,
          fieldKey: 'avatar',
          maxPixelSize: 1920,
          quality: 97,
          transform: (img, meta) => {
            const minSize = Math.min(meta.width!, meta.height!);
            return img.extract({
              width: Math.floor(minSize),
              height: Math.floor(minSize),
              top: Math.floor((meta.height! - minSize) / 2),
              left: Math.floor((meta.width! - minSize) / 2),
            });
          },
        },
        (err, avatarSrcRes) =>
          err || !avatarSrcRes ? reject(err?.code) : resolve(avatarSrcRes)
      );
    });

    await new Promise<number>((r, j) => {
      db.users.update(
        { _id: req.userId },
        { $set: { avatarSrc } },
        {},
        numCallback(r, j)
      );
    });

    const newMedia: Partial<PostDBType> = {
      creatorId: req.userId,
      date: Date.now(),
      mediaSrc: avatarSrc,
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

export default putAvatar;
