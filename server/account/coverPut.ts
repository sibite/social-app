import { RequestHandler } from 'express';
import db from '../database/database';
import saveImage from '../shared/saveImage';

const putCover: RequestHandler = async (req, res) => {
  saveImage(
    req,
    res,
    {
      storagePath: `${req.userId}/covers`,
      fieldKey: 'cover',
      maxPixelSize: 1980,
      transform: (img, meta) => {
        const aspectRatio = 3;
        const targetWidth = Math.min(meta.width!, meta.height! * aspectRatio);
        console.log(targetWidth);
        return img.extract({
          width: Math.floor(targetWidth),
          height: Math.floor(targetWidth / aspectRatio),
          top: Math.floor((meta.height! - targetWidth / aspectRatio) / 2),
          left: Math.floor((meta.width! - targetWidth) / 2),
        });
      },
    },
    (coverSrc) => {
      console.log(coverSrc);
      db.users.update(
        { _id: req.userId },
        { $set: { coverSrc } },
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

export default putCover;
