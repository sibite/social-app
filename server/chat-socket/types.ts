import type { Server, Socket } from 'socket.io';

export interface ServerToClientMessage {
  fromId: string;
  toId: string;
  date: number;
  content: string;
}

export interface ServerToClientEvents {
  'new-message': (message: ServerToClientMessage) => void;
}

export interface ClientToServerEvents {
  'new-message': (message: { toId: string; content: string }) => void;
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
