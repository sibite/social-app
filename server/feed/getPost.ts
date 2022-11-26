import { RequestHandler } from 'express';
import { PostDBType, PostIncomingType } from '../api-types/feed';
import db from '../database';
import getFullName from '../shared/getFullName';
import getUserFileURL from '../shared/getUserFileURL';
import {
  arrCallback,
  numCallback,
  singleCallback,
} from '../shared/nedbPromises';

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

    const commentsCount = await new Promise<number>((r, j) => {
      db.comments.count({ postId }, numCallback(r, j));
    });

    const post: Partial<PostIncomingType> = {
      ...postRes,
      fullName: getFullName({ name, lastName }),
      avatarSrc: getUserFileURL(avatarSrc),
      commentsCount,
      mediaSrc: getUserFileURL(postRes.mediaSrc),
      options: {
        delete: req.userId === postRes.creatorId,
        withMedia: postRes.type === 'post' && !postRes.mediaSrc,
      },
    };

    let media;

    if (postRes.mediaSrc) {
      media = [
        {
          _id: postRes._id,
          src: getUserFileURL(postRes.mediaSrc),
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
        src: getUserFileURL(mediaItem.mediaSrc),
      }));
    }

    post.media = media;

    res.status(200).send(post);
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
    console.error(err);
  }
};

export default getPost;
