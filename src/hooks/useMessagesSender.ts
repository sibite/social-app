import { useCallback } from 'react';
import useWebSocket from './useWebSocket';

const useMessageSender = (profileId: string) => {
  const socket = useWebSocket();

  const sendMessage = useCallback(
    (content: string) => {
      const contentTrimmed = content.trim();
      if (!contentTrimmed) return;
      socket.emit('new-message', {
        toId: profileId,
        content: contentTrimmed,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profileId]
  );

  const deleteMessage = useCallback(
    (id: string) => {
      socket.emit('delete-message', id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { sendMessage, deleteMessage };
};

export default useMessageSender;
