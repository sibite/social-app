/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import db from '../database';
import { updateCallback, singleCallback } from '../shared/nedbPromises';

const toggleFollow: RequestHandler = async (req, res) => {
  const { profileId } = req.params;
  const { userId } = req;

  if (!(profileId && userId)) return res.status(501).send();

  try {
    const user = await new Promise<any>((resolve, reject) => {
      db.users.findOne(
        { _id: userId },
        { following: 1 },
        singleCallback(resolve, reject)
      );
    });

    const following =
      user.following && user.following.indexOf(profileId) !== -1;

    const operator = following ? '$pull' : '$push';

    await new Promise<any>((resolve, reject) => {
      db.users.update(
        { _id: userId },
        { [operator]: { following: profileId } },
        {},
        updateCallback(resolve, reject)
      );
    });

    res.status(201).send({ invalidates: userId });
  } catch (err) {
    res.status(500).send();
  }
};

export default toggleFollow;
