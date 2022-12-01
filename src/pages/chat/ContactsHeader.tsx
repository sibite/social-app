import { Flex, Heading } from '@chakra-ui/react';

const ContactsHeader: React.FC = () => {
  const style = {
    w: 'full',
    h: 'full',
    px: 3,
    overflow: 'hidden',
  };

  return (
    <Flex alignItems="center" sx={style}>
      <Heading as="h1" size="md">
        Contacts
      </Heading>
    </Flex>
  );
};

export default ContactsHeader;
