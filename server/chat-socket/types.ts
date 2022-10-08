import type { Server, Socket } from 'socket.io';

export interface ServerToClientEvents {
  'new-message': (message: {
    from: string;
    to: string;
    date: number;
    content: string;
  }) => void;
}

export interface ClientToServerEvents {
  'new-message': (message: { to: string; content: string }) => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userId: string;
}

export type AppServerIO = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type AppSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
