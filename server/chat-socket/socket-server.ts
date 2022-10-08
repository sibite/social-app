import type { Server as HttpServerType } from 'http';
import { Server } from 'socket.io';
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

    socket.on('new-message', ({ toId, content }) => {
      const newMessage = {
        fromId: userId,
        toId,
        date: Date.now(),
        content,
      };
      console.log('new message', { userId, toId });
      socket.emit('new-message', newMessage);
      io.in(toId).emit('new-message', newMessage);
    });
  });
};

export default createSocketIO;
