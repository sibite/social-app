import {
  Avatar,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  VStack,
} from '@chakra-ui/react';
import { UserCircleIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import { useGetProfileQuery } from '../../store/profile-api';

interface Props {
  profileId: string;
}

const UserDetails: React.FC<Props> = ({ profileId }) => {
  const { currentData } = useGetProfileQuery(profileId);

  if (!currentData)
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    );

  return (
    <VStack w="full" spacing={6} p={8}>
      <Avatar
        size="xl"
        src={currentData.avatarSrc}
        name={currentData.avatarSrc ? undefined : currentData.fullName}
      />
      <Heading as="h1" size="md">
        {currentData.fullName}
      </Heading>
      <Flex gap={2} flexWrap="wrap" justifyContent="center">
        <Button
          as={Link}
          to={`/profile/${profileId}`}
          leftIcon={<HeroIcon as={UserCircleIcon} />}
        >
          View profile
        </Button>
      </Flex>
    </VStack>
  );
};

export default UserDetails;
