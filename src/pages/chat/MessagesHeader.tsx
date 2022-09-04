import { Avatar, Flex, Heading } from '@chakra-ui/react';

const ContactsHeader: React.FC = () => {
  const style = {
    w: 'full',
    h: 'full',
    px: 3,
  };

  return (
    <Flex alignItems="center" sx={style} gap={4}>
      <Avatar size="md" name="Stephen Hawking" />
      <Heading as="h1" size="md">
        Stephen Hawking
      </Heading>
    </Flex>
  );
};

export default ContactsHeader;
