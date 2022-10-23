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
import { current } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import { useGetProfileQuery } from '../../store/profile-api';

interface Props {
  profileId: string;
}

const UserDetails: React.FC<Props> = ({ profileId }) => {
  const { currentData, isLoading } = useGetProfileQuery(profileId);

  if (isLoading)
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    );

  return (
    <VStack boxSize="100%" spacing={6} p={8} overflowY="auto">
      <Avatar
        size="xl"
        src={currentData?.avatarSrc}
        name={currentData?.avatarSrc ? undefined : currentData?.fullName}
        key={currentData?.avatarSrc}
      />
      <Heading as="h1" size="md">
        {currentData?.fullName ?? 'User'}
      </Heading>
      <Flex gap={2} flexWrap="wrap" justifyContent="center">
        {currentData && (
          <Button
            as={Link}
            to={`/profile/${profileId}`}
            leftIcon={<HeroIcon as={UserCircleIcon} />}
          >
            View profile
          </Button>
        )}
      </Flex>
    </VStack>
  );
};

export default UserDetails;
