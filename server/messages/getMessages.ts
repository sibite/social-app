/* eslint-disable consistent-return */
import { RequestHandler } from 'express';
import db from '../database';
import { arrCallback } from '../shared/nedbPromises';

const getMessages: RequestHandler = async (req, res) => {
  const { userId } = req;
  const { profileId, from, to } = req.params;

  if (!userId || !profileId || !from || !to) return res.status(501).send();

  try {
    const messages = await new Promise<any[]>((r, j) => {
      db.messages
        .find({
          $or: [
            { fromId: userId, toId: profileId },
            { fromId: profileId, toId: userId },
          ],
        })
        .sort({ date: -1 })
        .skip(+from)
        .limit(+to + 1 - +from)
        .exec(arrCallback(r, j));
    });

    messages.reverse();

    res.status(200).send(messages);
  } catch (err) {
    res.status(typeof err === 'number' ? err : 500).send();
  }
};

export default getMessages;
