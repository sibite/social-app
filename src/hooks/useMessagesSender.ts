import { useCallback } from 'react';
import publisher from '../shared/publisher';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { messagesActions } from '../store/messages/messages';
import useWebSocket from './useWebSocket';

const clientRef = Math.floor(Math.random() * 10e10)
  .toString()
  .padStart(10);
let currentRefId = 0;

const useMessageSender = (profileId: string) => {
  const socket = useWebSocket();
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  const sendMessage = useCallback(
    (content: string) => {
      const contentTrimmed = content.trim();
      if (!contentTrimmed) return;
      const ref = `${clientRef}_${currentRefId}`;
      socket.emit('new-message', {
        toId: profileId,
        content: contentTrimmed,
        ref,
      });
      publisher.emit('message-sent', { content, ref });
      if (userId)
        dispatch(
          messagesActions.awaitMessage({
            ref,
            fromId: userId,
            toId: profileId,
            content,
          })
        );
      currentRefId += 1;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profileId, userId]
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
