import { RequestHandler } from 'express';
import { PostDBType, PostIncomingType } from '../api-types/feed';
import db from '../database/database';
import getFullName from '../shared/getFullName';
import getSrcUrl from '../shared/getSrcUrl';
import { arrCallback, singleCallback } from '../shared/nedbPromises';

const getPost: RequestHandler = async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(501).send();
    return;
  }

  try {
    const postRes = await new Promise<PostDBType>((r, j) => {
      db.feed.findOne({ _id: postId }, singleCallback(r, j));
    });

    const { name, lastName, avatarSrc } = await new Promise<any>((r, j) => {
      db.users.findOne(
        { _id: postRes.creatorId },
        { name: 1, lastName: 1, avatarSrc: 1 },
        singleCallback(r, j)
      );
    });

    const post: Partial<PostIncomingType> = {
      ...postRes,
      fullName: getFullName({ name, lastName }),
      avatarSrc: getSrcUrl(avatarSrc),
      options: { delete: req.userId === postRes.creatorId },
    };

    let media;

    if (postRes.mediaSrc) {
      media = [
        {
          _id: postRes._id,
          src: getSrcUrl(postRes.mediaSrc),
        },
      ];
    } else {
      media = (
        await new Promise<any[]>((r, j) => {
          db.feed
            .find({ _id: { $in: postRes.mediaIds } }, { mediaSrc: 1 })
            .sort({ date: 1 })
            .exec(arrCallback(r, j));
        })
      ).map((mediaItem) => ({
        _id: mediaItem._id,
        src: getSrcUrl(mediaItem.mediaSrc),
      }));
    }

    post.media = media;

    res.status(200).send(post);
  } catch (err) {
    res.status(500).send({ message: 'Error when reaching feed database' });
    console.error(err);
  }
};

export default getPost;
