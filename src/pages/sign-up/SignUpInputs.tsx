import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
  Select,
  SimpleGrid,
} from '@chakra-ui/react';
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

const SignUpInputs: React.FC<Props> = ({
  firstName,
  lastName,
  email,
  emailUsed,
  birthDate,
  password,
  repeatPassword,
}) => {
  const FirstNameJSX = (
    <FormControl isInvalid={firstName.showInvalidity}>
      <FormLabel>First name</FormLabel>
      <Input
        type="text"
        placeholder="Joseph"
        value={firstName.value}
        onChange={firstName.changeHandler}
        onBlur={firstName.touchHandler}
      />
      <FormErrorMessage>{firstName.errorMessage}</FormErrorMessage>
    </FormControl>
  );

  const LastNameJSX = (
    <FormControl isInvalid={lastName.showInvalidity}>
      <FormLabel>Last name</FormLabel>
      <Input
        type="text"
        placeholder="Murphy"
        value={lastName.value}
        onChange={lastName.changeHandler}
        onBlur={lastName.touchHandler}
      />
      <FormErrorMessage>{lastName.errorMessage}</FormErrorMessage>
    </FormControl>
  );

  const EmailJSX = (
    <FormControl isInvalid={email.showInvalidity}>
      <FormLabel>Your e-mail address</FormLabel>
      <Input
        type="email"
        placeholder="employee@company.org"
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
    <FormControl isInvalid={birthDate.showInvalidity}>
      <FormLabel>Date of birth</FormLabel>
      <SimpleGrid columns={4} spacing={5}>
        <GridItem colSpan={1}>
          <Select
            placeholder="DD"
            onBlur={birthDate.day.touchHandler}
            onChange={birthDate.day.changeHandler}
          >
            {birthDate.day.options.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem colSpan={2}>
          <Select
            placeholder="MMMM"
            onBlur={birthDate.month.touchHandler}
            onChange={birthDate.month.changeHandler}
          >
            {birthDate.month.options.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem colSpan={1}>
          <Select
            placeholder="YYYY"
            onBlur={birthDate.year.touchHandler}
            onChange={birthDate.year.changeHandler}
          >
            {birthDate.year.options.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
        </GridItem>
      </SimpleGrid>
      <FormErrorMessage>{birthDate.errorMessage}</FormErrorMessage>
    </FormControl>
  );

  const PasswordJSX = (
    <FormControl isInvalid={password.showInvalidity}>
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        value={password.value}
        onChange={password.changeHandler}
        onBlur={password.touchHandler}
      />
      <FormErrorMessage>{password.errorMessage}</FormErrorMessage>
    </FormControl>
  );

  const RepeatPasswordJSX = (
    <FormControl isInvalid={repeatPassword.showInvalidity}>
      <FormLabel>Repeat password</FormLabel>
      <Input
        type="password"
        value={repeatPassword.value}
        onChange={repeatPassword.changeHandler}
        onBlur={repeatPassword.touchHandler}
      />
      <FormErrorMessage>{repeatPassword.errorMessage}</FormErrorMessage>
    </FormControl>
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
export default SignUpInputs;
