/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import { UserDBType } from '../api-types/auth';
import db from '../database';
import getPasswordHash from '../shared/getPasswordHash';
import { numCallback, singleCallback } from '../shared/nedbPromises';

const patchableFields: (keyof UserDBType)[] = [
  'description',
  'birthDate',
  'name',
  'lastName',
];

const patch: RequestHandler = async (req, res) => {
  const updatedFields: Partial<UserDBType> = {};

  try {
    const user = await new Promise<Pick<UserDBType, 'salt' | 'passwordHash'>>(
      (r, j) => {
        db.users.findOne({ _id: req.userId }, singleCallback(r, j));
      }
    );
    const actualPasswordHash = user.passwordHash;
    const passwordHash = getPasswordHash(req.body.password, user.salt);

    if (actualPasswordHash !== passwordHash) return res.status(403).send();

    if (req.body.newPassword)
      updatedFields.passwordHash = getPasswordHash(
        req.body.newPassword,
        user.salt
      );

    patchableFields
      .filter((fieldKey) => req.body[fieldKey] !== undefined)
      .forEach((fieldKey) => {
        updatedFields[fieldKey] = req.body[fieldKey];
      });

    await new Promise<number>((r, j) => {
      db.users.update(
        { _id: req.userId },
        { $set: updatedFields },
        {},
        numCallback(r, j)
      );
    });

    res.status(200).send();
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default patch;
