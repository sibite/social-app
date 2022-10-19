/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { UserType } from '../api-types/auth';
import db from '../database';
import getUserFileURL from '../shared/getUserFileURL';
import { numCallback, singleCallback } from '../shared/nedbPromises';

const getProfile: RequestHandler = async (req, res) => {
  const { profileId } = req.params;
  const { userId } = req;

  if (!(userId && profileId)) return res.status(501).send();

  try {
    const profile = await new Promise<Partial<UserType>>((r, j) => {
      db.users.findOne(
        { _id: profileId },
        {
          name: 1,
          lastName: 1,
          avatarSrc: 1,
          coverSrc: 1,
          description: 1,
          following: 1,
        },
        singleCallback(r, j)
      );
    });

    const isFollowed = !!(await new Promise<any>((r, j) => {
      db.users.count(
        { _id: userId, following: { $elemMatch: profileId } },
        numCallback(r, j)
      );
    }));

    const response = {
      ...profile,
      isFollowed,
      fullName: `${profile.name} ${profile.lastName}`,
      avatarSrc: getUserFileURL(profile.avatarSrc),
      coverSrc: getUserFileURL(profile.coverSrc),
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default getProfile;
