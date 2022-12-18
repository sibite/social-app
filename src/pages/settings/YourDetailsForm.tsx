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
import AppDateFormControl from '../../components/misc/AppDateFormControl';
import AppFormControl from '../../components/misc/AppFormControl';
import useDateInput from '../../hooks/useDateInput';
import useInputControl from '../../hooks/useInputControl';
import useMobileModeValue from '../../hooks/useMobileModeValue';
import getDayjsInstance from '../../shared/getDayjsInstance';
import {
  useGetAccountDataQuery,
  useUpdateDetailsMutation,
} from '../../store/account-api';
import {
  birthDateOptions,
  firstNameOptions,
  lastNameOptions,
} from '../sign-up/form-controls';

const dayjs = getDayjsInstance();

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
  const inputs = [firstName, lastName, birthDate, password];
  const isFormValid = inputs.every((input) => !input.isInvalid);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    inputs.forEach((input) => input.touchHandler());
    if (!isFormValid) return;

    setLastTypedPwd(password.value);

    updateDetails({
      name: firstName.value,
      lastName: lastName.value,
      birthDate: birthDate.value.valueOf(),
      password: password.value,
    })
      .unwrap()
      .then(() => {
        password.reset();
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
            isRequired
          />
        </GridItem>
        <GridItem colSpan={2}>
          <AppFormControl
            inputControl={lastName}
            label="Last name"
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
            inputControl={password}
            label="Your password"
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
export default YourDetailsForm;
