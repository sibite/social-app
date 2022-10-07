import {
  Alert,
  AlertDescription,
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
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import useInputControl from '../../hooks/useInputControl';
import { LogInBodyType } from '../../../server/api-types/auth';
import { authActions } from '../../store/auth';
import { useAppDispatch } from '../../store/hooks';
import LogInInputs from './LogInInputs';

const LogInPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isError, setIsError] = useState(false);
  const [isInternalError, setIsInternalError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const email = useInputControl({ initialValue: '' });
  const password = useInputControl({ initialValue: '' });

  const showSignUpAlert = searchParams.get('account_created') === '1';

  const sendLogInReq = async (data: LogInBodyType) => {
    try {
      const res = await axios.post('/api/auth/log-in', data);
      if (!res.data.user && !res.data.token) throw new Error();
      dispatch(authActions.logIn(res.data));
      navigate('/profile/me');
    } catch (error: any) {
      switch (error.response?.status) {
        case 400:
          setIsError(true);
          break;
        default:
          setIsInternalError(true);
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    setIsError(false);
    setIsInternalError(false);
    setSearchParams({ account_created: '0' });
    sendLogInReq({ email: email.value, password: password.value });
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
        {isInternalError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Internal server error</AlertTitle>
          </Alert>
        )}
        {showSignUpAlert && (
          <Alert status="success" variant="subtle">
            <AlertIcon />
            <AlertTitle>Account has been created</AlertTitle>
            <AlertDescription>Please log in</AlertDescription>
          </Alert>
        )}
        <LogInInputs email={email} password={password} isError={isError} />
        <Text my={0}>
          <span>Don&apos;t have an account? </span>
          <Link as={RouterLink} to="/sign-up">
            Create one
          </Link>
        </Text>
        <Button as="button" type="submit" w="100%" isLoading={isLoading}>
          Log in
        </Button>
      </VStack>
    </Flex>
  );
};

export default LogInPage;
