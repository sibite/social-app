import { Request, Response } from 'express';
import path from 'path';
import sharp, { Metadata, Sharp } from 'sharp';
import { JPEG_QUALITY } from '../env';
import ensureDirExists from './directoryUtils';

interface Options {
  fieldKey: string;
  storagePath: string;
  transform?: (sharpImg: Sharp, metadata: Metadata) => Sharp;
  maxPixelSize: number;
}

const saveImage = async (
  req: Request,
  res: Response,
  { fieldKey, maxPixelSize, storagePath, transform }: Options,
  callback: (src: string) => any
) => {
  const image = req.files?.[fieldKey];

  if (!image || 'length' in image) {
    res.status(400).send({ message: 'No file sent' });
    return;
  }

  let pixels = 0;
  let metadata;
  let imgObj;

  try {
    imgObj = sharp(image.data);
    metadata = await imgObj.metadata();
    pixels = (metadata.width ?? 0) * (metadata.height ?? 0);
    if (pixels === 0 || !metadata.width || !metadata.height) throw new Error();
  } catch (err) {
    res.status(500).send({ message: 'Error when reading file metadata' });
    return;
  }

  try {
    if (transform) {
      imgObj = transform(imgObj, await imgObj.metadata());
    }

    if (pixels > maxPixelSize ** 2) {
      if (metadata.width >= metadata.height) {
        imgObj = imgObj.resize(maxPixelSize);
      } else {
        imgObj = imgObj.resize(null, maxPixelSize);
      }
    }

    const dirPath = `../uploads/${storagePath}`;
    const filePath = `${dirPath}/${image.md5}_${Date.now()}.jpg`;
    const imageSource = `/api${filePath.slice(2)}`;

    ensureDirExists(path.join(__dirname, dirPath));
    await imgObj
      .jpeg({ quality: JPEG_QUALITY })
      .toFile(path.join(__dirname, filePath));

    callback(imageSource);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Error when compressing file' });
  }
};

export default saveImage;
