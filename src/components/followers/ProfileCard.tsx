import {
  Flex,
  Avatar,
  VStack,
  Heading,
  Text,
  HStack,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../store/profile-api';
import Card from '../chakra-ui/Card';

interface Props {
  profileId: string;
}

const ProfileCard: React.FC<Props> = ({ profileId }) => {
  const profileQuery = useGetProfileQuery(profileId);
  const { isLoading } = profileQuery;
  let profile = profileQuery.data;
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/profile/${profileId}`);
  };

  if (isLoading)
    return (
      <Flex alignItems="center" p={2}>
        <SkeletonCircle mr={4} />
        <SkeletonText noOfLines={2} spacing={1} flex="1 1 auto" />
      </Flex>
    );

  if (!profile)
    profile = {
      avatarSrc: '',
      description: 'Account deleted',
      isFollowed: true,
    };

  const { fullName, avatarSrc, description } = profile;

  return (
    <Card variant="clickable" px={4} py={4} as="button" onClick={clickHandler}>
      <Flex align="flex-start" gap={2}>
        <Avatar name={avatarSrc ? undefined : fullName} src={avatarSrc} />
        <VStack
          align="flex-start"
          flexGrow={1}
          spacing={1}
          ml={1}
          overflow="hidden"
        >
          <Heading as="span" size="sm">
            {fullName}
          </Heading>
          <Text
            opacity={0.6}
            fontSize="sm"
            maxWidth="100%"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {description}
          </Text>
        </VStack>
      </Flex>
    </Card>
  );
};
export default ProfileCard;
