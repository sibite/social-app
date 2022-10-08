import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppSelector } from '../store/hooks';

const getSocketInstance = (() => {
  let socket: ReturnType<typeof io>;
  return () => {
    if (!socket) {
      socket = io();
    }
    return socket;
  };
})();

const useWebSocket = () => {
  const token = useAppSelector((state) => state.auth.token);
  const socket = getSocketInstance();

  useEffect(() => {
    socket.auth = { token };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return socket;
};

export default useWebSocket;
