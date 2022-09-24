import { RequestHandler } from 'express';
import { UserType } from '../api-types/auth';
import db from '../database/database';

const patchableFields: (keyof UserType)[] = ['description', 'birthDate'];

const patch: RequestHandler = (req, res) => {
  const updatedFields: Partial<UserType> = {};

  patchableFields
    .filter((fieldKey) => req.body[fieldKey] !== undefined)
    .forEach((fieldKey) => {
      updatedFields[fieldKey] = req.body[fieldKey];
    });

  db.users.update(
    { _id: req.userId },
    { $set: updatedFields },
    {},
    (err, numOfUpdated) => {
      if (err || !numOfUpdated) {
        res.status(500).send({ message: 'Error when updating database entry' });
        return;
      }
      res.sendStatus(201);
    }
  );
};

export default patch;
