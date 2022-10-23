import { useEffect } from 'react';
import { ServerToClientMessage } from '../../../../server/chat-socket/socket-types';
import useWebSocket from '../../../hooks/useWebSocket';
import { contactsActions } from '../../../store/contacts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { messagesActions } from '../../../store/messages/messages';

const useUpdateMessageHandler = () => {
  const socket = useWebSocket();
  const dispatch = useAppDispatch();

  const myId = useAppSelector((state) => state.auth.userId);
  const contacts = useAppSelector((state) => state.contacts.contacts);

  useEffect(() => {
    const updateMessageHandler = (message: ServerToClientMessage) => {
      if (message.fromId !== myId && message.toId !== myId) return;
      const contactId = message.fromId === myId ? message.toId : message.fromId;
      dispatch(messagesActions.updateMessage({ userId: contactId, message }));
      const shouldUpdateContact = contacts.find(
        ({ lastMessage }) => lastMessage._id === message._id
      );
      if (shouldUpdateContact)
        dispatch(contactsActions.update({ contactId, message }));
    };

    socket.on('update-message', updateMessageHandler);
    return () => {
      socket.off('update-message', updateMessageHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, contacts]);
};

export default useUpdateMessageHandler;
