import { RequestHandler } from 'express';
import db from '../database/database';
import saveImage from '../shared/saveImage';

const putAvatar: RequestHandler = async (req, res) => {
  saveImage(
    req,
    {
      storagePath: `${req.userId}/avatars`,
      fieldKey: 'avatar',
      maxPixelSize: 1920,
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
    (err, avatarSrc) => {
      if (err) {
        res.status(err.code).send({ message: err.message });
        return;
      }
      db.users.update(
        { _id: req.userId },
        { $set: { avatarSrc } },
        {},
        (dbErr, numOfUpdated) => {
          if (dbErr || !numOfUpdated) {
            res.status(500).send({ message: 'Error when saving to database' });
            return;
          }
          res.sendStatus(201);
        }
      );
    }
  );
};

export default putAvatar;
