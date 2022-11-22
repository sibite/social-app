import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import sharp, { Metadata, Sharp } from 'sharp';
import config from '../config/config';
import ensureDirExists from './directoryUtils';

interface Options {
  fieldKey: string;
  storagePath: string;
  transform?: (sharpImg: Sharp, metadata: Metadata) => Sharp;
  maxPixelSize?: number;
  quality?: number;
  id?: number;
}

const saveImage = async (
  req: Request,
  {
    fieldKey,
    id,
    maxPixelSize = 1280,
    quality,
    storagePath,
    transform,
  }: Options,
  callback: (err?: { code: number; message: string }, src?: string) => any
) => {
  const startTime = Date.now();
  let image = req.files?.[fieldKey];

  if (id !== undefined && image) {
    image =
      (image as UploadedFile[])[id] ?? (id === 0 && (image as UploadedFile));
  }

  if (!image || 'length' in image) {
    callback({ code: 400, message: 'No file sent' });
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
    callback({ code: 500, message: 'Error when reading file metadata' });
    return;
  }

  try {
    imgObj = sharp(await imgObj.rotate().toBuffer());
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

    const fileName = `${Date.now()}_${image.md5}.jpg`;
    const filePath = `${storagePath}/${fileName}`;

    const absDirPath = path.join(
      __dirname,
      `../../database/uploads/${storagePath}`
    );
    const absFilePath = path.join(absDirPath, fileName);

    ensureDirExists(absDirPath);
    await imgObj
      .jpeg({ quality: quality || config.JPEG_QUALITY })
      .toFile(absFilePath);
    const endTime = Date.now();
    console.log(`Saving image ${endTime - startTime}ms`);

    callback(undefined, filePath);
  } catch (err) {
    callback({ code: 500, message: 'Error when compressing file' });
  }
};

export default saveImage;
