import { Avatar, Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { memo, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppCard from '../../chakra-ui/AppCard';
import PostContext from '../PostContext';

interface Props {
  profileId?: string;
  avatarSrc?: string;
  fullName: string;
  dateString: string;
  commentMenu?: React.ReactNode;
  children: React.ReactNode;
}

const Comment: React.FC<Props> = ({
  profileId,
  avatarSrc,
  fullName,
  dateString,
  commentMenu,
  children,
}) => {
  const { commentColor } = useContext(PostContext);

  const cardStyle = {
    bgColor: commentColor,
    py: 2,
    px: 3,
  };

  const style = {
    minWidth: 0,
    '.toolbar': {
      transition: 'all 150ms',
    },
    '&:hover .toolbar': {
      opacity: 1,
    },
  };

  return (
    <Flex sx={style} gap={2}>
      <Avatar
        as={Link}
        to={profileId ? `/profile/${profileId}` : '#'}
        name={avatarSrc ? undefined : fullName}
        src={avatarSrc}
        size="sm"
      />
      <VStack align="flex-start">
        <AppCard
          sx={cardStyle}
          variant="flat"
          borderRadius="xl"
          alignItems="flex-start"
        >
          <Heading
            size="xs"
            as={Link}
            to={profileId ? `/profile/${profileId}` : '#'}
          >
            {fullName}
          </Heading>
          <Text wordBreak="break-word" whiteSpace="pre-wrap">
            {children}
          </Text>
        </AppCard>
        <Box>
          <Text opacity={0.6} fontSize="xs" marginTop={-2}>
            {dateString}
          </Text>
        </Box>
      </VStack>
      {commentMenu}
    </Flex>
  );
};

export default memo(Comment);
