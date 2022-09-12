import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Link,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useDateInput from '../../hooks/useDateInput';
import useInputControl from '../../hooks/useInputControl';
import {
  dateOfBirthOptions,
  emailOptions,
  firstNameOptions,
  lastNameOptions,
  passwordOptions,
  repeatPasswordOptions,
} from './form-controls';

const SignUpPage: React.FC = () => {
  const firstName = useInputControl(firstNameOptions);
  const lastName = useInputControl(lastNameOptions);
  const email = useInputControl(emailOptions);
  const dateOfBirth = useDateInput(dateOfBirthOptions);
  const password = useInputControl(passwordOptions);
  const repeatPassword = useInputControl(repeatPasswordOptions(password));

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
      <FormErrorMessage>{email.errorMessage}</FormErrorMessage>
    </FormControl>
  );

  const DateOfBirthJSX = (
    <FormControl isInvalid={dateOfBirth.showInvalidity}>
      <FormLabel>Date of birth</FormLabel>
      <SimpleGrid columns={4} spacing={5}>
        <GridItem colSpan={1}>
          <Select
            placeholder="DD"
            onBlur={dateOfBirth.day.touchHandler}
            onChange={dateOfBirth.day.changeHandler}
          >
            {dateOfBirth.day.options.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem colSpan={2}>
          <Select
            placeholder="MMMM"
            onBlur={dateOfBirth.month.touchHandler}
            onChange={dateOfBirth.month.changeHandler}
          >
            {dateOfBirth.month.options.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
        </GridItem>
        <GridItem colSpan={1}>
          <Select
            placeholder="YYYY"
            onBlur={dateOfBirth.year.touchHandler}
            onChange={dateOfBirth.year.changeHandler}
          >
            {dateOfBirth.year.options.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </Select>
        </GridItem>
      </SimpleGrid>
      <FormErrorMessage>{dateOfBirth.errorMessage}</FormErrorMessage>
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

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const inputs = [
      firstName,
      lastName,
      email,
      dateOfBirth,
      password,
      repeatPassword,
    ];
    inputs.forEach((input) => input.touchHandler());
  };

  const bg1 = useColorModeValue('gray.100', 'black');
  const bg2 = useColorModeValue('white', 'gray.900');

  const formStyle = {
    py: 8,
    m: 'auto',
    p: 7,
    borderRadius: 8,
    w: ['100%', 460],
    background: bg2,
  };

  return (
    <Flex direction="row" h={['100vh']} justify="center" background={bg1}>
      <VStack as="form" sx={formStyle} spacing={8} onSubmit={submitHandler}>
        <Heading as="h1">Sign up</Heading>
        <SimpleGrid columns={4} spacing={5}>
          <GridItem colSpan={2}>{FirstNameJSX}</GridItem>
          <GridItem colSpan={2}>{LastNameJSX}</GridItem>
          <GridItem colSpan={4}>{EmailJSX}</GridItem>
          <GridItem colSpan={4}>{DateOfBirthJSX}</GridItem>
          <GridItem colSpan={4}>{PasswordJSX}</GridItem>
          <GridItem colSpan={4}>{RepeatPasswordJSX}</GridItem>
        </SimpleGrid>
        <VStack spacing={2}>
          <Text my={0}>By clicking Sign Up you agree to our terms</Text>
          <Text my={0}>
            <span>Already have an account? </span>
            <Link as={RouterLink} to="/login" color="blue.400">
              Log in
            </Link>
          </Text>
        </VStack>
        <Button as="button" type="submit" w="100%">
          Sign up
        </Button>
      </VStack>
    </Flex>
  );
};

export default SignUpPage;
