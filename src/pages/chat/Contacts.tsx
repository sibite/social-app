import { VStack } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useGetAccountDataQuery } from '../../store/account-api';
import { contactsActions } from '../../store/contacts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Contact from './Contact';

const Contacts: React.FC = () => {
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const { data } = useGetAccountDataQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (contacts.length !== 0) return;
    const fetchedContacts = data?.contacts ?? {};
    const contactsArr = Object.values(fetchedContacts);
    dispatch(contactsActions.init(contactsArr));
  }, [data, dispatch]);

  const style = {
    w: 'full',
    h: 'full',
    p: 3,
  };

  return (
    <VStack sx={style}>
      {contacts.map(({ userId, lastMessage }) => (
        <Contact profileId={userId} lastMessage={lastMessage} />
      ))}
    </VStack>
  );
};

export default Contacts;
