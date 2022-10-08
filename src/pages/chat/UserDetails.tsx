import { Avatar, Heading, VStack } from '@chakra-ui/react';
import { useGetProfileQuery } from '../../store/profile-api';

interface Props {
  profileId: string;
}

const UserDetails: React.FC<Props> = ({ profileId }) => {
  const { currentData } = useGetProfileQuery(profileId);

  if (!currentData) return <span>Loading</span>;

  return (
    <VStack w="full" spacing={6} p={8}>
      <Avatar
        size="xl"
        src={currentData.avatarSrc}
        name={currentData.avatarSrc ? undefined : currentData.name}
      />
      <Heading as="h1" size="md">
        {currentData.name}
      </Heading>
    </VStack>
  );
};

export default UserDetails;
