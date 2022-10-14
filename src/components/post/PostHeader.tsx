import { Avatar, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface Props {
  profileId?: string;
  avatarSrc?: string;
  name: string;
  dateString: string;
  children?: React.ReactNode;
}

const PostHeader: React.FC<Props> = ({
  profileId,
  avatarSrc,
  name,
  dateString,
  children,
}) => (
  <Flex align="center" gap={2}>
    <Avatar
      as={Link}
      to={profileId ? `/profile/${profileId}` : '#'}
      name={avatarSrc ? undefined : name}
      src={avatarSrc}
    />
    <VStack align="flex-start" flexGrow={1} spacing={0}>
      <Heading
        as={Link}
        to={profileId ? `/profile/${profileId}` : '#'}
        size="sm"
      >
        {name}
      </Heading>
      <Text opacity={0.6} fontSize="sm">
        {dateString}
      </Text>
    </VStack>
    {children}
  </Flex>
);
export default PostHeader;
