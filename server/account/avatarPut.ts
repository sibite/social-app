import { RequestHandler } from 'express';
import path from 'path';
import sharp from 'sharp';
import db from '../database/database';
import ensureDirExists from '../shared/directoryUtils';

const putAvatar: RequestHandler = async (req, res) => {
  const avatar = req.files?.avatar;

  if (!avatar || 'length' in avatar) {
    res.status(400).send({ message: 'No file sent' });
    return;
  }

  let pixels = 0;

  try {
    const metadata = await sharp(avatar.data).metadata();
    pixels = (metadata.width ?? 0) * (metadata.height ?? 0);
    if (pixels === 0) throw new Error();
  } catch (err) {
    res.status(500).send({ message: 'Error when reading file metadata' });
    return;
  }

  try {
    let image = sharp(avatar.data);

    if (pixels > 1638400) {
      image = sharp(avatar.data).resize(1280);
    }

    const dirPath = `../uploads/${req.userId}/avatars`;
    const filePath = `${dirPath}/${avatar.md5}.jpg`;
    const avatarSrc = `/api${filePath.slice(2)}`;

    ensureDirExists(path.join(__dirname, dirPath));
    await image.jpeg().toFile(path.join(__dirname, filePath));

    db.users.update(
      { _id: req.userId },
      { $set: { avatarSrc } },
      {},
      (err, numOfUpdated) => {
        if (err || !numOfUpdated) {
          res.status(500).send({ message: 'Error when saving user data' });
          return;
        }
        res.sendStatus(201);
      }
    );
  } catch (err) {
    res.status(500).send({ message: 'Error when compressing file' });
  }
};

export default putAvatar;
