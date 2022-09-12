import { Avatar, Heading, VStack } from '@chakra-ui/react';

interface Props {
  avatar?: string;
  name?: string;
}

const UserDetails: React.FC<Props> = ({ avatar, name = 'User' }) => (
  <VStack w="full" spacing={6} p={8}>
    <Avatar size="xl" src={avatar} name={name} />
    <Heading as="h1" size="md">
      {name}
    </Heading>
  </VStack>
);

export default UserDetails;
