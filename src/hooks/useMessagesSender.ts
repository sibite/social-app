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

  return sendMessage;
};

export default useMessageSender;
