import { useCallback, useEffect, useState } from 'react';
import { ServerToClientMessage } from '../../server/chat-socket/types';
import {
  messagesApi,
  useGetMessagesCountQuery,
  useGetMessagesQuery,
} from '../store/messages-api';
import useWebSocket from './useWebSocket';

const useMessages = (userId: string) => {
  const socket = useWebSocket();
  const { currentData: messagesCount, refetch } =
    useGetMessagesCountQuery(userId);
  const { currentData: messagesFetched } = useGetMessagesQuery({
    profileId: userId,
    from: 0,
    to: (messagesCount?.count ?? 1) - 1,
  });
  const [newMessages, setNewMessages] = useState<ServerToClientMessage[]>([]);

  useEffect(() => {
    refetch();
  }, [userId, refetch]);

  useEffect(() => {
    const newMessageHandler = (message: ServerToClientMessage) => {
      if (message.fromId !== userId && message.toId !== userId) return;
      setNewMessages((prev) => [message, ...prev]);
    };
    socket.on('new-message', newMessageHandler);

    return () => {
      socket.off('new-message', newMessageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

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
    messages: newMessages.concat(
      (() => {
        const arr = messagesFetched && messagesFetched.slice();
        arr?.reverse();
        return arr ?? [];
      })()
    ),
    sendMessage,
  };
};

export default useMessages;
