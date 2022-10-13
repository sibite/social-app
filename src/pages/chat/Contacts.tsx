import { Center, Spinner, useBoolean, VStack } from '@chakra-ui/react';
import { useGetAccountDataQuery } from '../../store/account-api';
import { useAppSelector } from '../../store/hooks';
import Contact from './Contact';

let isFetched;

const Contacts: React.FC = () => {
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const { isFetching } = useGetAccountDataQuery();

  const style = {
    w: 'full',
    h: 'full',
    p: 3,
  };

  if (isFetching)
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    );

  return (
    <VStack sx={style} overflowY="auto">
      {contacts.map(({ userId, lastMessage }) => (
        <Contact profileId={userId} lastMessage={lastMessage} />
      ))}
    </VStack>
  );
};

export default Contacts;
