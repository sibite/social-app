import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useBoolean,
  Checkbox,
} from '@chakra-ui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/outline';
import { useRef } from 'react';
import { PostIncomingType } from '../../../server/api-types/feed';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  options: PostIncomingType['options'];
  onDelete: Function;
}

const PostMenu: React.FC<Props> = ({ onDelete, options }) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useBoolean(false);
  const [withMedia, setWithMedia] = useBoolean(true);
  const [isDeleting, setIsDeleting] = useBoolean(false);

  const deleteHandler = () => {
    onDelete(withMedia);
    setIsDeleting.on();
    setWithMedia.on();
  };

  if (!options) {
    return null;
  }

  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Post menu"
          icon={<HeroIcon as={DotsVerticalIcon} />}
          variant="ghost"
        />
        <MenuList>
          {options.delete && (
            <MenuItem icon={<TrashIcon />} onClick={setIsConfirmDialogOpen.on}>
              Delete
            </MenuItem>
          )}
        </MenuList>
      </Menu>
      <AlertDialog
        isOpen={isConfirmDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={setIsConfirmDialogOpen.off}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This operation is inreversible
              <Checkbox mt={2} defaultChecked onChange={setWithMedia.toggle}>
                Delete attached media
              </Checkbox>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={setIsConfirmDialogOpen.off}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteHandler}
                ml={3}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default PostMenu;
