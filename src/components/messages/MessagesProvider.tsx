import { useEffect } from 'react';
import useWebSocket from '../../hooks/useWebSocket';
import { useGetAccountDataQuery } from '../../store/account-api';
import { contactsActions } from '../../store/contacts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { messagesActionsThunks } from '../../store/messages';
import useNewMessageEventHandler from './event-handlers/useNewMessageEventHandler';
import useUpdateMessageEventHandler from './event-handlers/useUpdateMessageEventHandler';

const MessagesProvider: React.FC = () => {
  const socket = useWebSocket();
  const myId = useAppSelector((state) => state.auth.userId);
  const userEntities = useAppSelector((state) => state.messages.userEntities);

  useNewMessageEventHandler();
  useUpdateMessageEventHandler();

  const { data } = useGetAccountDataQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const connectHandler = () => {
      Object.keys(userEntities).forEach((id) => {
        dispatch(messagesActionsThunks.refetchMessages(id));
      });
    };
    socket.on('connect', connectHandler);

    return () => {
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
