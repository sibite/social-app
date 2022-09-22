import { RequestHandler } from 'express';
import db from '../database/database';
import saveImage from '../shared/saveImage';

const putAvatar: RequestHandler = async (req, res) => {
  saveImage(
    req,
    res,
    {
      storagePath: `${req.userId}/avatars`,
      fieldKey: 'avatar',
      maxPixelSize: 1280,
      transform: (img, meta) => {
        const minSize = Math.min(meta.width!, meta.height!);
        console.log(minSize);
        return img.extract({
          width: Math.floor(minSize),
          height: Math.floor(minSize),
          top: Math.floor((meta.height! - minSize) / 2),
          left: Math.floor((meta.width! - minSize) / 2),
        });
      },
    },
    (avatarSrc) => {
      console.log(avatarSrc);
      db.users.update(
        { _id: req.userId },
        { $set: { avatarSrc } },
        {},
        (err, numOfUpdated) => {
          if (err || !numOfUpdated) {
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
