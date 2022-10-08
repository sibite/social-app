import { useCallback, useEffect, useState } from 'react';
import { ServerToClientMessage } from '../../server/chat-socket/types';
import useWebSocket from './useWebSocket';

const useMessages = (userId: string) => {
  const socket = useWebSocket();
  const [messages, setMessages] = useState<ServerToClientMessage[]>([]);

  useEffect(() => {
    const newMessageHandler = (message: ServerToClientMessage) => {
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
      const contentTrimmed = content.trim();
      if (!contentTrimmed) return;
      socket.emit('new-message', {
        toId: userId,
        content: contentTrimmed,
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
