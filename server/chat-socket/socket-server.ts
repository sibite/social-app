import type { Server as HttpServerType } from 'http';
import { Server } from 'socket.io';
import authenticateWS from './authenticateWS';
import getDeleteMessageHandler from './deleteMessage';
import getNewMessageHandler from './newMessage';
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './socket-types';

const createSocketIO = (httpServer: HttpServerType) => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  io.use(authenticateWS);

  io.on('connection', (socket) => {
    const { userId } = socket.data;

    if (!userId) return;

    socket.join(userId);

    socket.on('new-message', getNewMessageHandler(io, socket, userId));
    socket.on('delete-message', getDeleteMessageHandler(io, socket, userId));
  });
};

export default createSocketIO;
