import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  GridItem,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import AppFormControl from '../../components/misc/AppFormControl';
import useInputControl from '../../hooks/useInputControl';
import useMobileModeValue from '../../hooks/useMobileModeValue';
import passwordValidator from '../../shared/validators/password-validator';
import { useUpdateDetailsMutation } from '../../store/account-api';
import { passwordOptions } from '../sign-up/form-controls';

interface Props {}

const ChangePasswordPanel: React.FC<Props> = () => {
  const [updateDetails, { isLoading, error }] = useUpdateDetailsMutation();

  const [lastTypedPwd, setLastTypedPwd] = useState('');

  const toast = useToast();
  const toastPosition = useMobileModeValue('top', 'bottom');

  const isGeneralError = error && (error as any)?.status !== 403;

  const password = useInputControl({
    validator: (v) => lastTypedPwd !== v || (error as any)?.status !== 403,
    errorMessage: 'Wrong password',
  });
  const newPassword = useInputControl({
    ...passwordOptions,
    validator: passwordValidator,
  });

  const inputs = [newPassword, password];
  const isFormValid = inputs.every((input) => !input.isInvalid);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    inputs.forEach((input) => input.touchHandler());
    if (!isFormValid) return;

    setLastTypedPwd(password.value);

    updateDetails({
      newPassword: newPassword.value,
      password: password.value,
    })
      .unwrap()
      .then(() => {
        password.reset();
        newPassword.reset();
        toast({
          title: 'Updated successfully',
          status: 'success',
          duration: 3000,
          position: toastPosition,
        });
      });
  };

  return (
    <form onSubmit={submitHandler}>
      {isGeneralError && (
        <Alert status="error" mb={8}>
          <AlertIcon />
          <AlertTitle>An error occured</AlertTitle>
        </Alert>
      )}
      <SimpleGrid columns={1} spacing={5}>
        <GridItem colSpan={1}>
          <AppFormControl
            inputControl={password}
            label="Old password"
            type="password"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={1}>
          <AppFormControl
            inputControl={newPassword}
            label="New password"
            type="password"
            isRequired
          />
        </GridItem>
      </SimpleGrid>
      <Button
        float="right"
        mt={8}
        colorScheme="green"
        type="submit"
        isLoading={isLoading}
        disabled={!isFormValid}
      >
        Update
      </Button>
    </form>
  );
};
export default ChangePasswordPanel;
