import db from '../database';
import { numCallback, singleCallback } from '../shared/nedbPromises';
import {
  AppServerIO,
  ClientToServerEvents,
  ServerToClientMessage,
} from './socket-types';

const getNewMessageHandler =
  (io: AppServerIO, userId: string): ClientToServerEvents['new-message'] =>
  async ({ toId, content }) => {
    const newMessage = {
      fromId: userId,
      toId,
      date: Date.now(),
      content,
    };

    try {
      const newMessageRes = await new Promise<ServerToClientMessage>((r, j) => {
        db.messages.insert(newMessage, singleCallback(r, j));
      });

      try {
        await new Promise<any>((r, j) => {
          db.users.update(
            { _id: userId },
            {
              $set: {
                [`contacts.${toId}`]: {
                  userId: toId,
                  lastMessage: newMessageRes,
                },
              },
            },
            {},
            numCallback(r, j)
          );
        });
        await new Promise<any>((r, j) => {
          db.users.update(
            { _id: toId },
            {
              $set: {
                [`contacts.${userId}`]: {
                  userId,
                  lastMessage: newMessageRes,
                },
              },
            },
            {},
            numCallback(r, j)
          );
        });
      } catch (err) {
        console.error('Error when updating contacts');
      }
      io.in(userId).emit('new-message', newMessageRes);
      if (toId !== userId) io.in(toId).emit('new-message', newMessageRes);
    } catch (err) {
      console.error(err);
    }
  };

export default getNewMessageHandler;
