import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Heading,
  Input,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import useInputControl from '../hooks/useInputControl';
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

  const password = useInputControl({
    initialValue: '',
    validator: passwordValidator,
    errorMessage:
      'Password must be at least 8 characters long containing lowercase letter, uppercase letter and number',
  });

  const repeatPassword = useInputControl({
    initialValue: '',
    validator: (x) => password.isInvalid || x === password.props.value,
    errorMessage: 'Passwords do not match',
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const inputs = [firstName, lastName, email, password, repeatPassword];
    inputs.forEach((input) => input.props.touchHandler());
    const formIsValid = inputs.every((input) => !input.isInvalid);
  };

  return (
    <Container>
      <Flex direction="row" h={['100vh']} justify="center">
        <VStack
          as="form"
          spacing={8}
          py={8}
          m="auto"
          w={['100%', 400]}
          onSubmit={submitHandler}
        >
          <Heading as="h1">Sign up</Heading>
          <SimpleGrid columns={4} spacing={5}>
            <GridItem colSpan={2}>
              <FormControl isInvalid={firstName.showInvalidity}>
                <FormLabel>First name</FormLabel>
                <Input
                  type="text"
                  value={firstName.props.value}
                  onChange={firstName.props.changeHandler}
                  onBlur={firstName.props.touchHandler}
                />
                <FormErrorMessage>{firstName.errorMessage}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isInvalid={lastName.showInvalidity}>
                <FormLabel>Last name</FormLabel>
                <Input
                  type="text"
                  value={lastName.props.value}
                  onChange={lastName.props.changeHandler}
                  onBlur={lastName.props.touchHandler}
                />
                <FormErrorMessage>{lastName.errorMessage}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl isInvalid={email.showInvalidity}>
                <FormLabel>Your e-mail address</FormLabel>
                <Input
                  type="email"
                  value={email.props.value}
                  onChange={email.props.changeHandler}
                  onBlur={email.props.touchHandler}
                />
                <FormErrorMessage>{email.errorMessage}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl isInvalid={password.showInvalidity}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password.props.value}
                  onChange={password.props.changeHandler}
                  onBlur={password.props.touchHandler}
                />
                <FormErrorMessage>{password.errorMessage}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <FormControl isInvalid={repeatPassword.showInvalidity}>
                <FormLabel>Repeat password</FormLabel>
                <Input
                  type="password"
                  value={repeatPassword.props.value}
                  onChange={repeatPassword.props.changeHandler}
                  onBlur={repeatPassword.props.touchHandler}
                />
                <FormErrorMessage>
                  {repeatPassword.errorMessage}
                </FormErrorMessage>
              </FormControl>
            </GridItem>
          </SimpleGrid>
          <Button as="button" type="submit" w="100%">
            Sign up
          </Button>
        </VStack>
      </Flex>
    </Container>
  );
};

export default SignUpPage;
