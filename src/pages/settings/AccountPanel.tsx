import {
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertIcon,
  AlertTitle,
  Button,
  Text,
  ButtonGroup,
  Checkbox,
  useDisclosure,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import AppFormControl from '../../components/misc/AppFormControl';
import useInputControl from '../../hooks/useInputControl';
import useLogout from '../../hooks/useLogout';
import { useDeleteAccountMutation } from '../../store/account-api';

const AccountPanel: React.FC = () => {
  const [deleteAccount, { isLoading, error }] = useDeleteAccountMutation();
  const logOut = useLogout();

  const [lastTypedPwd, setLastTypedPwd] = useState('');
  const [checked, setChecked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const isGeneralError = error && (error as any)?.status !== 403;

  const password = useInputControl({
    validator: (v) => lastTypedPwd !== v || (error as any)?.status !== 403,
    errorMessage: 'Wrong password',
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setLastTypedPwd(password.value);

    deleteAccount(password.value)
      .unwrap()
      .then(() => {
        onClose();
        toast({
          title: 'Deleted successfully',
          status: 'success',
          duration: 2000,
          position: 'top',
        });
        setTimeout(() => {
          logOut();
        }, 2000);
      });
  };

  return (
    <VStack alignItems="flex-start" spacing={8}>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>Delete account</AlertDialogHeader>
            <AlertDialogBody>
              {isGeneralError && (
                <Alert status="error" mb={8}>
                  <AlertIcon />
                  <AlertTitle>An error occured</AlertTitle>
                </Alert>
              )}
              <Text mb={4}>Please enter your password to confirm</Text>
              <AppFormControl
                inputControl={password}
                label="Password"
                type="password"
                isRequired
              />
            </AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  isLoading={isLoading}
                  onClick={submitHandler}
                >
                  Delete account
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Alert status="error">
        <AlertIcon />
        <AlertDescription>
          <AlertTitle>This action is permanent</AlertTitle>
          After deleting your account, you will no longer be able to restore it
          or any personal information associated with it
        </AlertDescription>
      </Alert>
      <Checkbox onChange={(e) => setChecked(e.currentTarget.checked)}>
        I understand the risk
      </Checkbox>
      <Button onClick={onOpen} colorScheme="red" disabled={!checked}>
        Delete account
      </Button>
    </VStack>
  );
};
export default AccountPanel;
