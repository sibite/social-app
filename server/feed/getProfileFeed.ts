import { RequestHandler } from 'express';
import db from '../database';

const getProfileFeed: RequestHandler = (req, res) => {
  const { profileId } = req.params;

  if (!profileId) {
    res.status(501).send();
    return;
  }

  db.feed
    .find({ creatorId: profileId, type: 'post' }, { creatorId: 1 })
    .sort({ date: -1 })
    .exec((err, posts) => {
      if (err) {
        res.status(500).send({ message: 'Error when reaching database' });
        return;
      }

      res.status(200).send(posts.map((post) => post._id));
    });
};

export default getProfileFeed;
