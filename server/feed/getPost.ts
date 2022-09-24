import { RequestHandler } from 'express';
import { PostDBType } from '../api-types/feed';
import db from '../database/database';
import getFullName from '../shared/getFullName';

const dbErrResponse = { message: 'Error when reaching feed database' };

const getPost: RequestHandler = (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    res.status(501).send();
    return;
  }

  db.feed.findOne({ _id: postId }, (err, post: PostDBType) => {
    if (err) {
      res.status(500).send(dbErrResponse);
      return;
    }

    db.users.findOne(
      { _id: post.creatorId },
      { name: 1, lastName: 1, avatarSrc: 1 },
      (userErr, { name, lastName, avatarSrc }) => {
        if (userErr) {
          res.status(500).send(dbErrResponse);
          return;
        }

        db.media
          .find({ _id: { $in: post.mediaIds } }, { src: 1 })
          .sort({ date: 1 })
          .exec((mediaErr, media) => {
            if (mediaErr) {
              res.status(500).send(dbErrResponse);
              return;
            }

            res.status(200).send({
              ...post,
              mediaIds: undefined,
              fullName: getFullName({ name, lastName }),
              avatarSrc,
              media,
            });
          });
      }
    );
  });
};

export default getPost;
