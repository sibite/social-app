import type { Server as HttpServerType } from 'http';
import { Server } from 'socket.io';
import db from '../database';
import { numCallback, singleCallback } from '../shared/nedbPromises';
import authenticateWS from './authenticateWS';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  ServerToClientMessage,
  SocketData,
} from './types';

const createSocketIO = (httpServer: HttpServerType) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  io.use(authenticateWS);

  io.on('connection', (socket) => {
    console.log('Client connected');

    const { userId } = socket.data;

    if (!userId) return;

    socket.join(userId);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('new-message', async ({ toId, content }) => {
      const newMessage = {
        fromId: userId,
        toId,
        date: Date.now(),
        content,
      };

      try {
        const newMessageRes = await new Promise<ServerToClientMessage>(
          (r, j) => {
            db.messages.insert(newMessage, singleCallback(r, j));
          }
        );

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
        console.log('new message', { userId, toId });
        socket.emit('new-message', newMessageRes);
        io.in(toId).emit('new-message', newMessageRes);
      } catch (err) {
        console.error(err);
      }
    });
  });
};

export default createSocketIO;
