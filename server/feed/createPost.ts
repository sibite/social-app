import { RequestHandler } from 'express-serve-static-core';
import { PostType } from '../api-types/feed';
import db from '../database/database';
import saveImage from '../shared/saveImage';

interface MediaWrapper {
  date: number;
  src: string;
}

const createPost: RequestHandler = (req, res) => {
  const { content } = req.body;
  const uploadedMedia: MediaWrapper[] = [];

  const finishUploading = () => {
    const newEntries = uploadedMedia.map((mediaWrapper) => ({
      ...mediaWrapper,
      creatorId: req.userId,
    }));

    const onMediaInsert = (err: Error | null, media: any) => {
      if (err) {
        res
          .status(500)
          .send({ message: 'Error when inserting media to database' });
        return;
      }

      const newPost: Partial<PostType> = {
        creatorId: req.userId,
        date: Date.now(),
        content,
        mediaIds: media.map((mediaEntry: any) => mediaEntry._id),
      };

      db.feed.insert(newPost, (postErr, post) => {
        if (postErr) {
          res
            .status(500)
            .send({ message: 'Error when inserting post to database' });
          return;
        }
        res.status(201).send();
        console.log(post);
      });
    };

    db.media.insert(newEntries, onMediaInsert);
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
          uploadedMedia.push({ date: Date.now(), src: mediaSrc });
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
