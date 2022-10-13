import { useEffect } from 'react';
import { ServerToClientMessage } from '../../../server/chat-socket/types';
import useWebSocket from '../../hooks/useWebSocket';
import { useGetAccountDataQuery } from '../../store/account-api';
import { contactsActions } from '../../store/contacts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { messagesActions, messagesActionsThunks } from '../../store/messages';

const MessagesProvider: React.FC = () => {
  const socket = useWebSocket();
  const myId = useAppSelector((state) => state.auth.userId);
  const userEntities = useAppSelector((state) => state.messages.userEntities);
  const { data } = useGetAccountDataQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const newMessageHandler = (message: ServerToClientMessage) => {
      if (message.fromId !== myId && message.toId !== myId) return;
      const contactId = message.fromId === myId ? message.toId : message.fromId;
      dispatch(messagesActions.addMessage({ userId: contactId, message }));
      dispatch(contactsActions.update({ contactId, message }));
    };

    const connectHandler = () => {
      Object.keys(userEntities).forEach((id) => {
        dispatch(messagesActionsThunks.refetchMessages(id));
      });
    };

    socket.on('new-message', newMessageHandler);
    socket.on('connect', connectHandler);

    return () => {
      socket.off('new-message', newMessageHandler);
      socket.off('connect', connectHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchedContacts = data?.contacts ?? {};
    const contactsArr = Object.values(fetchedContacts);
    dispatch(contactsActions.init(contactsArr));
  }, [dispatch, myId, data]);

  return null;
};
export default MessagesProvider;
