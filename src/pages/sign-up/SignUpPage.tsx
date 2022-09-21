import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useDateInput from '../../hooks/useDateInput';
import useInputControl from '../../hooks/useInputControl';
import { SignUpBodyType } from '../../../server/api-types/auth';
import {
  birthDateOptions,
  emailOptions,
  firstNameOptions,
  lastNameOptions,
  passwordOptions,
  repeatPasswordOptions,
} from './form-controls';
import SignUpInputs from './SignUpInputs';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [emailInUse, setEmailInUse] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isInternalError, setIsInternalError] = useState(false);

  const firstName = useInputControl(firstNameOptions);
  const lastName = useInputControl(lastNameOptions);
  const email = useInputControl(emailOptions(emailInUse));
  const birthDate = useDateInput(birthDateOptions);
  const password = useInputControl(passwordOptions);
  const repeatPassword = useInputControl(repeatPasswordOptions(password));

  const sendSignUpReq = async (data: SignUpBodyType) => {
    try {
      await axios.post('/api/auth/sign-up', data);
      navigate({ pathname: '/login', search: '?account_created=1' });
    } catch (error: any) {
      switch (error.response?.status) {
        case 409:
          setEmailInUse(email.value);
          break;
        case 500:
          setIsInternalError(true);
          break;
        default:
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const inputs = [
      firstName,
      lastName,
      email,
      birthDate,
      password,
      repeatPassword,
    ];
    inputs.forEach((input) => input.touchHandler());

    const isFormValid = inputs.every((input) => !input.isInvalid);
    if (!isFormValid) return;

    setIsLoading(true);
    setIsInternalError(false);

    sendSignUpReq({
      name: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      birthDate: birthDate.value.valueOf(),
    });
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
        {isInternalError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Internal server error</AlertTitle>
          </Alert>
        )}
        <SignUpInputs
          firstName={firstName}
          lastName={lastName}
          email={email}
          emailUsed={emailInUse === email.value}
          birthDate={birthDate}
          password={password}
          repeatPassword={repeatPassword}
        />
        <VStack spacing={2}>
          <Text my={0}>By clicking Sign Up you agree to our terms</Text>
          <Text my={0}>
            <span>Already have an account? </span>
            <Link as={RouterLink} to="/login">
              Log in
            </Link>
          </Text>
        </VStack>
        <Button as="button" type="submit" w="100%" isLoading={isLoading}>
          Sign up
        </Button>
      </VStack>
    </Flex>
  );
};

export default SignUpPage;
