import { RequestHandler } from 'express';
import db from '../database/database';
import saveImage from '../shared/saveImage';

const putCover: RequestHandler = async (req, res) => {
  saveImage(
    req,
    {
      storagePath: `${req.userId}/covers`,
      fieldKey: 'cover',
      maxPixelSize: 2000,
      transform: (img, meta) => {
        const aspectRatio = 3;
        const targetWidth = Math.min(meta.width!, meta.height! * aspectRatio);
        return img.extract({
          width: Math.floor(targetWidth),
          height: Math.floor(targetWidth / aspectRatio),
          top: Math.floor((meta.height! - targetWidth / aspectRatio) / 2),
          left: Math.floor((meta.width! - targetWidth) / 2),
        });
      },
    },
    (err, coverSrc) => {
      if (err) {
        res.status(err.code).send({ message: err.message });
        return;
      }
      db.users.update(
        { _id: req.userId },
        { $set: { coverSrc } },
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

export default putCover;
