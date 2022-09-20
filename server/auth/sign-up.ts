import crypto from 'crypto';
import { RequestHandler } from 'express';
import validator from 'validator';
import db from '../database/database';

const signUp: RequestHandler = (req, res) => {
  const { name, lastName, email, password, birthDate } = req.body;

  const isFormValid = [
    validator.isLength(name, { min: 2 }),
    validator.isLength(lastName, { min: 2 }),
    validator.isEmail(email),
    validator.isLength(password, { min: 8 }),
    validator.isNumeric(birthDate),
  ].every((result) => result);

  if (!isFormValid) {
    res.status(400).send('Invalid form');
    return;
  }

  db.users.count({ email }, (error, n) => {
    if (error) {
      res.status(500).send();
      return;
    }

    if (n > 0) {
      res.status(409).send({ message: 'E-mail is already in use' });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto
      .pbkdf2Sync(password, salt, 100, 64, 'sha512')
      .toString('hex');

    const user = {
      name,
      lastName,
      email,
      passwordHash,
      salt,
    };

    db.users.insert(user, (err, newUser) => {
      if (err) {
        res.status(500).send();
        return;
      }
      res.status(201).json(newUser);
    });
  });
};

export default signUp;
