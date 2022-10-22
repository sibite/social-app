import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/outline';
import { useDeleteCommentMutation } from '../../../store/feed-api';
import HeroIcon from '../../chakra-ui/HeroIcon';

interface Props {
  isDeletable?: boolean;
  postId: string;
  commentId: string;
}

const CommentMenu: React.FC<Props> = ({ isDeletable, postId, commentId }) => {
  const [deleteComment] = useDeleteCommentMutation();

  const deleteHandler = () => {
    deleteComment({ postId, commentId });
  };

  const { onClose, onOpen, isOpen } = useDisclosure();

  const style = { alignSelf: 'center', opacity: isOpen ? 1 : 0, mb: 4 };

  if (!isDeletable) return null;

  return (
    <Box className="toolbar" sx={style}>
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
  );
};
export default CommentMenu;
