/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import db from '../database';
import { numCallback } from '../shared/nedbPromises';

const getMessagesCount: RequestHandler = async (req, res) => {
  const { userId } = req;
  const { profileId } = req.params;

  if (!userId || !profileId) return res.status(501).send();

  try {
    const messagesCount = await new Promise<number>((r, j) => {
      db.messages.count(
        {
          $or: [
            { fromId: userId, toId: profileId },
            { fromId: profileId, toId: userId },
          ],
        },
        numCallback(r, j)
      );
    });

    res.status(200).send({ count: messagesCount });
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default getMessagesCount;
