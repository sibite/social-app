import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { useDeleteCommentMutation } from '../../store/feed-api';
import Card from '../chakra-ui/Card';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  commentId: string;
  postId: string;
  avatarSrc?: string;
  fullName: string;
  dateString: string;
  isDeletable?: boolean;
  children: React.ReactNode;
}

const Comment: React.FC<Props> = ({
  commentId,
  postId,
  avatarSrc,
  fullName,
  dateString,
  isDeletable = false,
  children,
}) => {
  const [deleteComment] = useDeleteCommentMutation();

  const deleteHandler = () => {
    deleteComment({ postId, commentId });
  };

  const nodeColor = useColorModeValue('gray.100', 'gray.700');

  const cardStyle = {
    bgColor: nodeColor,
    py: 2,
    px: 3,
  };

  const style = {
    minWidth: 0,
    '.toolbar': {
      opacity: 0,
      transition: 'all 150ms',
    },
    '&:hover .toolbar': {
      opacity: 1,
    },
  };

  return (
    <Flex sx={style} gap={2}>
      <Avatar
        name={avatarSrc ? undefined : fullName}
        src={avatarSrc}
        size="sm"
      />
      <VStack align="flex-start">
        <Card sx={cardStyle} variant="flat" borderRadius="xl">
          <Heading as="span" size="xs">
            {fullName}
          </Heading>
          <Text wordBreak="break-word" whiteSpace="pre-wrap">
            {children}
          </Text>
        </Card>
        <Box>
          <Text opacity={0.6} fontSize="xs" marginTop={-2}>
            {dateString}
          </Text>
        </Box>
      </VStack>
      {isDeletable && (
        <HStack className="toolbar" alignSelf="center" mb={4}>
          <IconButton
            variant="ghost"
            colorScheme="red"
            size="sm"
            aria-label="Delete comment"
            icon={<HeroIcon as={TrashIcon} />}
            onClick={deleteHandler}
          />
        </HStack>
      )}
    </Flex>
  );
};

export default memo(Comment);
