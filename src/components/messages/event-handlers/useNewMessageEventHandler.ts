import { useEffect } from 'react';
import { ServerToClientMessage } from '../../../../server/chat-socket/socket-types';
import useWebSocket from '../../../hooks/useWebSocket';
import { contactsActions } from '../../../store/contacts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { messagesActions } from '../../../store/messages';

const useNewMessageEventHandler = () => {
  const socket = useWebSocket();
  const dispatch = useAppDispatch();

  const myId = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    const newMessageHandler = (message: ServerToClientMessage) => {
      if (message.fromId !== myId && message.toId !== myId) return;
      const contactId = message.fromId === myId ? message.toId : message.fromId;
      dispatch(messagesActions.addMessage({ userId: contactId, message }));
      dispatch(contactsActions.update({ contactId, message }));
    };

    socket.on('new-message', newMessageHandler);

    return () => {
      socket.off('new-message', newMessageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, myId]);
};

export default useNewMessageEventHandler;
