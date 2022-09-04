import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import useDateInput from '../hooks/useDateInput';
import useInputControl from '../hooks/useInputControl';
import createBirthDateValidator from '../shared/validators/birth-date-validator';
import emailValidator from '../shared/validators/email-validator';
import passwordValidator from '../shared/validators/password-validator';

const SignUpPage: React.FC = () => {
  const firstName = useInputControl({
    initialValue: '',
    validator: (x) => x.length > 1,
    errorMessage: 'First name must be at least 2 letters long',
  });

  const lastName = useInputControl({
    initialValue: '',
    validator: (x) => x.length > 1,
    errorMessage: 'Last name must be at least 2 letters long',
  });

  const email = useInputControl({
    initialValue: '',
    validator: emailValidator,
    errorMessage: 'Invalid format of e-mail',
  });

  const dateOfBirth = useDateInput({
    validator: createBirthDateValidator(13),
    errorMessage:
      'You must be at least 13 years old in order to use our service',
  });

  const password = useInputControl({
    initialValue: '',
    validator: passwordValidator,
    errorMessage:
      'Password must be at least 8 characters long containing lowercase letter, uppercase letter and number',
  });

  const repeatPassword = useInputControl({
    initialValue: '',
    validator: (x) => password.isInvalid || x === password.value,
    errorMessage: 'Passwords do not match',
  });

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
    const formIsValid = inputs.every((input) => !input.isInvalid);
  };

  const bg1 = useColorModeValue('gray.100', 'black');
  const bg2 = useColorModeValue('white', 'gray.900');

  return (
    <Flex direction="row" h={['100vh']} justify="center" background={bg1}>
      <VStack
        as="form"
        spacing={8}
        py={8}
        m="auto"
        p={7}
        borderRadius={8}
        w={['100%', 460]}
        background={bg2}
        onSubmit={submitHandler}
      >
        <Heading as="h1">Sign up</Heading>
        <SimpleGrid columns={4} spacing={5}>
          <GridItem colSpan={2}>
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
          </GridItem>
          <GridItem colSpan={2}>
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
          </GridItem>
          <GridItem colSpan={4}>
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
          </GridItem>
          <GridItem colSpan={4}>
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
          </GridItem>
          <GridItem colSpan={4}>
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
          </GridItem>
          <GridItem colSpan={4}>
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
          </GridItem>
        </SimpleGrid>
        <Text my={0}>By clicking Sign Up you agree to our terms</Text>
        <Button as="button" type="submit" w="100%">
          Sign up
        </Button>
      </VStack>
    </Flex>
  );
};

export default SignUpPage;
