import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  GridItem,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { isError } from 'util';
import AppDateFormControl from '../../components/misc/AppDateFormControl';
import AppFormControl from '../../components/misc/AppFormControl';
import useDateInput from '../../hooks/useDateInput';
import useInputControl from '../../hooks/useInputControl';
import useMobileModeValue from '../../hooks/useIsMobile';
import passwordValidator from '../../shared/validators/password-validator';
import {
  useGetAccountDataQuery,
  useUpdateDetailsMutation,
} from '../../store/account-api';
import {
  birthDateOptions,
  firstNameOptions,
  lastNameOptions,
  passwordOptions,
} from '../sign-up/form-controls';

interface Props {}

const YourDetailsForm: React.FC<Props> = () => {
  const { currentData: account } = useGetAccountDataQuery();
  const [updateDetails, { isLoading, error }] = useUpdateDetailsMutation();

  const [lastTypedPwd, setLastTypedPwd] = useState('');

  const toast = useToast();
  const toastPosition = useMobileModeValue('top', 'bottom');

  const isGeneralError = error && (error as any)?.status !== 403;

  const firstName = useInputControl({
    ...firstNameOptions,
    initialValue: account?.name,
  });
  const lastName = useInputControl({
    ...lastNameOptions,
    initialValue: account?.lastName,
  });
  const birthDate = useDateInput({
    ...birthDateOptions,
    initialValue: dayjs(account?.birthDate),
  });
  const password = useInputControl({
    validator: (v) => lastTypedPwd !== v || (error as any)?.status !== 403,
    errorMessage: 'Wrong password',
  });
  const newPassword = useInputControl({
    ...passwordOptions,
    validator: (v) => !v || passwordValidator(v),
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const inputs = [firstName, lastName, birthDate, newPassword, password];
    inputs.forEach((input) => input.touchHandler());

    const isFormValid = inputs.every((input) => !input.isInvalid);
    if (!isFormValid) return;

    setLastTypedPwd(password.value);

    updateDetails({
      name: firstName.value,
      lastName: lastName.value,
      birthDate: birthDate.value.valueOf(),
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
      <SimpleGrid columns={4} spacing={5}>
        <GridItem colSpan={2}>
          <AppFormControl
            inputControl={firstName}
            label="First name"
            placeholder="Joseph"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={2}>
          <AppFormControl
            inputControl={lastName}
            label="Last name"
            placeholder="Murphy"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={4}>
          <AppDateFormControl
            dateControl={birthDate}
            label="Date of birth"
            isRequired
          />
        </GridItem>
        <GridItem colSpan={4}>
          <AppFormControl
            inputControl={newPassword}
            label="New password"
            type="password"
          />
        </GridItem>
        <GridItem colSpan={4}>
          <AppFormControl
            inputControl={password}
            label="Actual password"
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
      >
        Update
      </Button>
    </form>
  );
};
export default YourDetailsForm;
