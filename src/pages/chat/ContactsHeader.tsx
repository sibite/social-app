import { Flex, Heading, IconButton } from '@chakra-ui/react';
import { CogIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';

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
      <IconButton
        ml="auto"
        aria-label="Settings"
        icon={<HeroIcon as={CogIcon} />}
      />
    </Flex>
  );
};

export default ContactsHeader;
