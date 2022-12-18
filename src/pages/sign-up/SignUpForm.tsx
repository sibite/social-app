import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import AppDateFormControl from '../../components/misc/AppDateFormControl';
import AppFormControl from '../../components/misc/AppFormControl';
import useDateInput from '../../hooks/useDateInput';
import useInputControl from '../../hooks/useInputControl';

type Field = ReturnType<typeof useInputControl>;

interface Props {
  firstName: Field;
  lastName: Field;
  email: Field;
  birthDate: ReturnType<typeof useDateInput>;
  password: Field;
  repeatPassword: Field;
  emailUsed: boolean;
}

const SignUpForm: React.FC<Props> = ({
  firstName,
  lastName,
  email,
  emailUsed,
  birthDate,
  password,
  repeatPassword,
}) => {
  const FirstNameJSX = (
    <AppFormControl
      inputControl={firstName}
      label="First name"
      isRequired
      autoFocus
    />
  );

  const LastNameJSX = (
    <AppFormControl inputControl={lastName} label="Last name" isRequired />
  );

  const EmailJSX = (
    <FormControl isInvalid={email.showInvalidity}>
      <FormLabel>Your e-mail address</FormLabel>
      <Input
        type="email"
        placeholder="example@domain.org"
        value={email.value}
        onChange={email.changeHandler}
        onBlur={email.touchHandler}
      />
      <FormErrorMessage>
        {emailUsed ? 'E-mail is already used' : email.errorMessage}
      </FormErrorMessage>
    </FormControl>
  );

  const DateOfBirthJSX = (
    <AppDateFormControl
      dateControl={birthDate}
      label="Date of birth"
      useDefaultValue={false}
      isRequired
    />
  );

  const PasswordJSX = (
    <AppFormControl
      inputControl={password}
      type="password"
      label="Password"
      isRequired
    />
  );

  const RepeatPasswordJSX = (
    <AppFormControl
      inputControl={repeatPassword}
      type="password"
      label="Repeat password"
      isRequired
    />
  );

  return (
    <SimpleGrid columns={4} spacing={5}>
      <GridItem colSpan={2}>{FirstNameJSX}</GridItem>
      <GridItem colSpan={2}>{LastNameJSX}</GridItem>
      <GridItem colSpan={4}>{EmailJSX}</GridItem>
      <GridItem colSpan={4}>{DateOfBirthJSX}</GridItem>
      <GridItem colSpan={4}>{PasswordJSX}</GridItem>
      <GridItem colSpan={4}>{RepeatPasswordJSX}</GridItem>
    </SimpleGrid>
  );
};
export default SignUpForm;
