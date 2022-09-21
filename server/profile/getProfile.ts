import { RequestHandler } from 'express';
import db from '../database/database';

const getProfile: RequestHandler = (req, res) => {
  const userId = req.params.profileId;
  console.log(`query profile id: ${userId}`);

  db.users.findOne(
    { _id: userId },
    { name: 1, lastName: 1, avatarSrc: 1, description: 1 },
    (err, profile) => {
      if (err) return res.status(500).send();
      if (!profile) return res.status(404).send();

      return res
        .status(200)
        .json({ fullName: `${profile.name} ${profile.lastName}`, ...profile });
    }
  );
};

export default getProfile;
