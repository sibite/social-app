import db from '../database';
import { numCallback, singleCallback } from '../shared/nedbPromises';
import {
  AppServerIO,
  ClientToServerEvents,
  ServerToClientMessage,
} from './socket-types';

const getDeleteMessageHandler =
  (io: AppServerIO, userId: string): ClientToServerEvents['delete-message'] =>
  async (messageId) => {
    try {
      await new Promise<number>((r, j) => {
        db.messages.update(
          { _id: messageId, fromId: userId },
          { $set: { content: '', deleted: true } },
          {},
          numCallback(r, j)
        );
      });

      const updatedMessage = await new Promise<ServerToClientMessage>(
        (r, j) => {
          db.messages.findOne({ _id: messageId }, singleCallback(r, j));
        }
      );

      await new Promise<any>((r, j) => {
        db.users.update(
          {
            _id: userId,
            [`contacts.${updatedMessage.toId}.lastMessage._id`]:
              updatedMessage._id,
          },
          {
            $set: {
              [`contacts.${updatedMessage.toId}`]: {
                userId: updatedMessage.toId,
                lastMessage: updatedMessage,
              },
            },
          },
          {},
          numCallback(r, j)
        );
      });

      await new Promise<any>((r, j) => {
        db.users.update(
          {
            _id: updatedMessage.toId,
            [`contacts.${updatedMessage.toId}.lastMessage._id`]:
              updatedMessage._id,
          },
          {
            $set: {
              [`contacts.${userId}`]: {
                userId,
                lastMessage: updatedMessage,
              },
            },
          },
          {},
          numCallback(r, j)
        );
      });

      io.in(userId).emit('update-message', updatedMessage);
      if (updatedMessage.toId !== userId)
        io.in(updatedMessage.toId).emit('update-message', updatedMessage);
    } catch (err) {
      console.error(err);
    }
  };

export default getDeleteMessageHandler;
