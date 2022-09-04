import { SettingsIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton } from '@chakra-ui/react';

const ContactsHeader: React.FC = () => {
  const style = {
    w: 'full',
    h: 'full',
    px: 3,
  };

  return (
    <Flex alignItems="center" sx={style}>
      <Heading as="h1" size="md">
        Contacts
      </Heading>
      <IconButton ml="auto" aria-label="Settings" icon={<SettingsIcon />} />
    </Flex>
  );
};

export default ContactsHeader;
