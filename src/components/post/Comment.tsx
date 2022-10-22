import {
  Avatar,
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/outline';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteCommentMutation } from '../../store/feed-api';
import Card from '../chakra-ui/Card';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  commentId: string;
  postId: string;
  profileId?: string;
  avatarSrc?: string;
  fullName: string;
  dateString: string;
  isDeletable?: boolean;
  children: React.ReactNode;
}

const Comment: React.FC<Props> = ({
  commentId,
  postId,
  profileId,
  avatarSrc,
  fullName,
  dateString,
  isDeletable = false,
  children,
}) => {
  const [deleteComment] = useDeleteCommentMutation();
  const { onClose, onOpen, isOpen } = useDisclosure();

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
      opacity: isOpen ? 1 : 0,
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
        <Card
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
        </Card>
        <Box>
          <Text opacity={0.6} fontSize="xs" marginTop={-2}>
            {dateString}
          </Text>
        </Box>
      </VStack>
      {isDeletable && (
        <Box className="toolbar" alignSelf="center" mb={4}>
          <Menu onOpen={onOpen} onClose={onClose}>
            <MenuButton
              as={IconButton}
              aria-label="Comment menu"
              icon={<HeroIcon as={DotsVerticalIcon} />}
              variant="ghost"
              size="sm"
            />
            <MenuList>
              <MenuItem
                aria-label="Delete comment"
                icon={<HeroIcon as={TrashIcon} />}
                onClick={deleteHandler}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Flex>
  );
};

export default memo(Comment);
