import { VStack } from '@chakra-ui/react';
import useContacts from '../../hooks/useContacts';
import Contact from './Contact';

const Contacts: React.FC = () => {
  const { contacts } = useContacts();

  const style = {
    w: 'full',
    h: 'full',
    p: 3,
  };

  return (
    <VStack sx={style}>
      {contacts.map((contactId) => (
        <Contact profileId={contactId} />
      ))}
    </VStack>
  );
};

export default Contacts;
