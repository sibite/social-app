import { Avatar, Heading, VStack } from '@chakra-ui/react';

interface Props {
  avatarSrc?: string;
  name?: string;
}

const UserDetails: React.FC<Props> = ({ avatarSrc, name = 'User' }) => (
  <VStack w="full" spacing={6} p={8}>
    <Avatar size="xl" src={avatarSrc} name={avatarSrc ? undefined : name} />
    <Heading as="h1" size="md">
      {name}
    </Heading>
  </VStack>
);

export default UserDetails;
