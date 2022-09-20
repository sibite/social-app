import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import useInputControl from '../../hooks/useInputControl';

type Field = ReturnType<typeof useInputControl>;

interface Props {
  email: Field;
  password: Field;
  isError: boolean;
}

const LogInInputs: React.FC<Props> = ({ email, password, isError }) => {
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

  return (
    <VStack spacing={5} width="full">
      <FormControl isInvalid={isError}>
        <FormErrorMessage>Incorrect e-mail or password</FormErrorMessage>
      </FormControl>
      {[EmailJSX, PasswordJSX]}
    </VStack>
  );
};
export default LogInInputs;
