import { RequestHandler } from 'express-serve-static-core';
import { PostDBType } from '../api-types/feed';
import db from '../database';
import { arrCallback, singleCallback } from '../shared/nedbPromises';
import saveImage from '../shared/saveImage';

interface MediaWrapper {
  date: number;
  mediaSrc: string;
}

const createPost: RequestHandler = (req, res) => {
  const { content } = req.body;
  const uploadedMedia: MediaWrapper[] = [];

  const finishUploading = async () => {
    let newEntries: Partial<PostDBType>[] = uploadedMedia.map(
      (mediaWrapper) => ({
        ...mediaWrapper,
        likedBy: [],
        content: '',
        creatorId: req.userId,
      })
    );

    const newPost: Partial<PostDBType> = {
      creatorId: req.userId,
      date: Date.now(),
      content,
      type: 'post',
    };

    try {
      if (newEntries.length === 1) {
        newPost.mediaSrc = newEntries[0].mediaSrc;
      } else {
        newEntries = newEntries.map((entry) => ({ ...entry, type: 'media' }));

        const media = await new Promise<any>((r, j) => {
          db.feed.insert(newEntries, arrCallback(r, j));
        });

        newPost.mediaIds = media.map((mediaEntry: any) => mediaEntry._id);
      }

      await new Promise<any>((r, j) => {
        db.feed.insert(newPost, singleCallback(r, j));
      });

      res.status(201).send();
    } catch (err) {
      res.status(500).send();
    }
  };

  const saveNextImage = (id: number) => {
    saveImage(
      req,
      {
        fieldKey: 'media',
        id,
        maxPixelSize: 1920,
        storagePath: `${req.userId}/feed`,
      },
      (err, mediaSrc) => {
        if (err && err?.code !== 400) {
          res.status(err?.code || 500).send(err && { message: err.message });
          return;
        }
        if (!err && mediaSrc) {
          uploadedMedia.push({ date: Date.now(), mediaSrc });
          saveNextImage(id + 1);
          return;
        }
        finishUploading();
      }
    );
  };

  saveNextImage(0);
};
export default createPost;
