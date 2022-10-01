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
import { useDeleteCommentMutation } from '../../store/feed-api';
import Card from '../chakra-ui/Card';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  commentId: string;
  postId: string;
  avatarSrc?: string;
  name: string;
  dateString: string;
  isDeletable?: boolean;
  children: React.ReactNode;
}

const Comment: React.FC<Props> = ({
  commentId,
  postId,
  avatarSrc,
  name,
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
      <Avatar name={avatarSrc ? undefined : name} src={avatarSrc} size="sm" />
      <VStack align="flex-start">
        <Card sx={cardStyle} variant="flat">
          <Heading as="span" size="xs">
            {name}
          </Heading>
          <Text>{children}</Text>
        </Card>
        <Box>
          <Text opacity={0.6} fontSize="xs" marginTop={-2}>
            {dateString}
          </Text>
        </Box>
      </VStack>
      <HStack className="toolbar" alignSelf="center">
        <IconButton
          variant="ghost"
          colorScheme="red"
          size="sm"
          aria-label="Delete comment"
          icon={<HeroIcon as={TrashIcon} />}
          onClick={deleteHandler}
        />
      </HStack>
    </Flex>
  );
};

export default Comment;
