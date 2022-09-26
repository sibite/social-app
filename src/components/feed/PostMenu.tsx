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
import { useEffect, useRef } from 'react';
import { PostIncomingType } from '../../../server/api-types/feed';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  options: PostIncomingType['options'];
  onDelete: (withMedia: boolean) => Promise<any>;
}

const PostMenu: React.FC<Props> = ({ onDelete, options }) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useBoolean(false);
  const [withMedia, setWithMedia] = useBoolean(true);
  const [isDeleting, setIsDeleting] = useBoolean(false);

  useEffect(() => {
    setIsDeleting.off();
  }, [isConfirmDialogOpen]);

  const deleteHandler = async () => {
    try {
      setIsDeleting.on();
      await onDelete(!!options.withMedia && withMedia);
    } finally {
      setIsDeleting.off();
      setWithMedia.on();
      setIsConfirmDialogOpen.off();
    }
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
            <MenuItem
              icon={<HeroIcon as={TrashIcon} />}
              onClick={setIsConfirmDialogOpen.on}
            >
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
        <AlertDialogOverlay pointerEvents="auto">
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This operation is inreversible
              {options.withMedia && (
                <Checkbox mt={2} defaultChecked onChange={setWithMedia.toggle}>
                  Delete attached media (if there are more than 1)
                </Checkbox>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={setIsConfirmDialogOpen.off}
                disabled={isDeleting}
              >
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
