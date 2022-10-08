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

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    socket.on('new-message', ({ to, content }) => {
      console.log('new message', to, content);
      socket.emit('new-message', { from: 'test1', to, date: 0, content });
    });
  });
};

export default createSocketIO;
