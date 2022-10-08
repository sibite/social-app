import type { Server as HttpServerType } from 'http';
import { Server } from 'socket.io';
import db from '../database';
import { singleCallback } from '../shared/nedbPromises';
import authenticateWS from './authenticateWS';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
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
    console.log('Client connected', socket.handshake.auth);

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

      await new Promise<any>((r, j) => {
        db.messages.insert(newMessage, singleCallback(r, j));
      });
      console.log('new message', { userId, toId });
      socket.emit('new-message', newMessage);
      io.in(toId).emit('new-message', newMessage);
    });
  });
};

export default createSocketIO;
