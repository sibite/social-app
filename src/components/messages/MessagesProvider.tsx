import { useEffect } from 'react';
import { ServerToClientMessage } from '../../../server/chat-socket/types';
import useContacts from '../../hooks/useContacts';
import useWebSocket from '../../hooks/useWebSocket';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { messagesActions } from '../../store/messages';

const MessagesProvider: React.FC = () => {
  const socket = useWebSocket();
  const { addContacts } = useContacts();
  const myId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newMessageHandler = (message: ServerToClientMessage) => {
      if (message.fromId !== myId && message.toId !== myId) return;
      const contactId = message.fromId === myId ? message.toId : message.fromId;
      dispatch(messagesActions.addMessage({ userId: contactId, message }));
      addContacts([contactId]);
    };
    socket.on('new-message', newMessageHandler);

    return () => {
      socket.off('new-message', newMessageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, addContacts]);

  return null;
};
export default MessagesProvider;
