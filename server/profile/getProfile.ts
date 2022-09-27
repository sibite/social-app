import { RequestHandler } from 'express';
import db from '../database';
import getSrcUrl from '../shared/getSrcUrl';

const getProfile: RequestHandler = (req, res) => {
  const userId = req.params.profileId;

  db.users.findOne(
    { _id: userId },
    { name: 1, lastName: 1, avatarSrc: 1, coverSrc: 1, description: 1 },
    (err, profile) => {
      if (err) return res.status(500).send();
      if (!profile) return res.status(404).send();

      return res.status(200).json({
        ...profile,
        fullName: `${profile.name} ${profile.lastName}`,
        avatarSrc: getSrcUrl(profile.avatarSrc),
        coverSrc: getSrcUrl(profile.coverSrc),
      });
    }
  );
};

export default getProfile;
