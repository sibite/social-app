import { useCallback, useEffect, useState } from 'react';
import useWebSocket from './useWebSocket';

const useMessages = (userId: string) => {
  const socket = useWebSocket();
  const [messages, setMessages] = useState<
    { from: string; to: string; date: number; content: string }[]
  >([]);

  useEffect(() => {
    const newMessageHandler = (message: {
      from: string;
      to: string;
      date: number;
      content: string;
    }) => {
      setMessages((prev) => [message, ...prev]);
    };
    socket.on('new-message', newMessageHandler);

    return () => {
      socket.off('new-message', newMessageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      socket.emit('new-message', {
        to: userId,
        content,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userId]
  );

  return {
    messages,
    sendMessage,
  };
};

export default useMessages;
