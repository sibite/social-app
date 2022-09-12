import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import useInputControl from '../../hooks/useInputControl';

const SignUpPage: React.FC = () => {
  const email = useInputControl({ initialValue: '' });
  const password = useInputControl({ initialValue: '' });

  const EmailJSX = (
    <FormControl isInvalid={email.showInvalidity}>
      <FormLabel>Your e-mail address</FormLabel>
      <Input
        type="email"
        placeholder="employee@company.org"
        value={email.value}
        onChange={email.changeHandler}
      />
    </FormControl>
  );

  const PasswordJSX = (
    <FormControl isInvalid={password.showInvalidity}>
      <FormLabel>Password</FormLabel>
      <Input
        type="password"
        value={password.value}
        onChange={password.changeHandler}
      />
    </FormControl>
  );

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const inputs = [email, password];
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
        <Heading as="h1">Log in</Heading>
        <VStack spacing={5} width="full">
          <FormControl>
            <FormErrorMessage>Incorrect e-mail or password</FormErrorMessage>
          </FormControl>
          {[EmailJSX, PasswordJSX]}
        </VStack>
        <Text my={0}>
          <span>Don&apos;t have an account? </span>
          <Link as={RouterLink} to="/sign-up" color="blue.400">
            Create one
          </Link>
        </Text>
        <Button as="button" type="submit" w="100%">
          Log in
        </Button>
      </VStack>
    </Flex>
  );
};

export default SignUpPage;
