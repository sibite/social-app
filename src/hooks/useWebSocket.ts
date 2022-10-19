import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../store/hooks';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../server/chat-socket/socket-types';

const getSocketInstance = (() => {
  let socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  return () => {
    if (!socket) {
      socket = io();
    }
    return socket;
  };
})();

let activeToken: string | undefined;

const useWebSocket = () => {
  const token = useAppSelector((state) => state.auth.token);
  const socket = getSocketInstance();

  useEffect(() => {
    if (activeToken === token) return;
    socket.disconnect();
    socket.auth = { token };
    socket.connect();
    activeToken = token;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return socket;
};

export default useWebSocket;
