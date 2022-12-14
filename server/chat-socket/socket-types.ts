import type { Server, Socket } from 'socket.io';

export interface ServerToClientMessage {
  _id: string;
  fromId: string;
  toId: string;
  date: number;
  content: string;
  deleted?: boolean;
  ref?: string;
}

export interface ServerToClientEvents {
  'new-message': (message: ServerToClientMessage) => void;
  'confirm-message-sent': (ref: string, toId: string) => void;
  'update-message': (message: ServerToClientMessage) => void;
}

export interface ClientToServerEvents {
  'new-message': (message: {
    toId: string;
    content: string;
    ref: string;
  }) => void;
  'delete-message': (messageId: string) => void;
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
