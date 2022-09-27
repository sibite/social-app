import crypto from 'crypto';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import db from '../database';
import { ACCESS_TOKEN_SECRET } from '../env';

const logIn: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send();
    return;
  }

  db.users.findOne({ email }, { salt: 1 }, (error, user) => {
    if (error) {
      res.status(500).send();
      return;
    }

    if (!user) {
      res.status(400).send({ message: 'Invalid e-mail or password' });
      return;
    }

    const passwordHash = crypto
      .pbkdf2Sync(password, user.salt, 100, 64, 'sha512')
      .toString('hex');

    db.users.findOne(
      { email, passwordHash },
      { salt: 0, passwordHash: 0 },
      (error2, user2) => {
        if (error2) return res.status(500).send();
        if (!user2)
          return res
            .status(400)
            .send({ message: 'Invalid e-mail or password' });

        console.log(user2, `access: ${ACCESS_TOKEN_SECRET}`);
        const token = jwt.sign(user2, ACCESS_TOKEN_SECRET);
        return res.status(200).send({
          userId: user2._id,
          token,
        });
      }
    );
  });
};

export default logIn;
