import { FormControl, FormErrorMessage, VStack } from '@chakra-ui/react';
import AppFormControl from '../../components/misc/AppFormControl';
import useInputControl from '../../hooks/useInputControl';

type Field = ReturnType<typeof useInputControl>;

interface Props {
  email: Field;
  password: Field;
  isError: boolean;
}

const LogInInputs: React.FC<Props> = ({ email, password, isError }) => {
  const EmailJSX = (
    <AppFormControl
      inputControl={email}
      label="Your e-mail address"
      type="email"
      placeholder="employee@company.org"
      autoFocus
    />
  );

  const PasswordJSX = (
    <AppFormControl inputControl={password} type="password" label="Password" />
  );

  return (
    <VStack spacing={5} width="full">
      <FormControl isInvalid={isError}>
        <FormErrorMessage>Invalid e-mail or password</FormErrorMessage>
      </FormControl>
      {EmailJSX}
      {PasswordJSX}
    </VStack>
  );
};
export default LogInInputs;
