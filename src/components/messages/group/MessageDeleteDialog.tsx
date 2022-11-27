import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => any;
  onConfirm: () => any;
}

const MessageDeleteDialog: React.FC<Props> = ({
  isOpen,
  onConfirm,
  onClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const confirmHandler = () => {
    onConfirm();
  };

  const closeHandler = () => {
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={closeHandler}
    >
      <AlertDialogOverlay pointerEvents="auto">
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete message
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? This operation is irreversible
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default MessageDeleteDialog;
