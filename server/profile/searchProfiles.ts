/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { UserType } from '../api-types/auth';
import db from '../database';
import { arrCallback } from '../shared/nedbPromises';

const searchProfiles: RequestHandler = async (req, res) => {
  const { query } = req.params;

  if (!query) return res.status(501).send();

  const words = query.split(/\s/);
  const regExString = `(${words.join('|')})`;
  const regExQuery = new RegExp(regExString, 'i');

  try {
    const profiles = await new Promise<UserType[]>((r, j) => {
      db.users
        .find(
          {
            $or: [
              { name: regExQuery },
              { lastName: regExQuery },
              { description: regExQuery },
            ],
          },
          { _id: 1 }
        )
        .limit(100)
        .exec(arrCallback(r, j));
    });

    const resProfiles = profiles.map((profile) => profile._id);

    res.status(200).json(resProfiles);
  } catch (err) {
    res.status(500).send();
  }
};

export default searchProfiles;
