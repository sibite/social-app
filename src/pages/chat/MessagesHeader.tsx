import { Avatar, Flex, Heading } from '@chakra-ui/react';

interface Props {
  name?: string;
  avatarSrc?: string;
}

const ContactsHeader: React.FC<Props> = ({ avatarSrc, name = 'User' }) => {
  const style = {
    w: 'full',
    h: 'full',
    px: 3,
  };

  return (
    <Flex alignItems="center" sx={style} gap={4}>
      <Avatar size="md" name={avatarSrc ? undefined : name} />
      <Heading as="h1" size="md">
        {name}
      </Heading>
    </Flex>
  );
};

export default ContactsHeader;
