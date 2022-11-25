import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import useInputControl from '../../hooks/useInputControl';

interface Props {
  inputControl: ReturnType<typeof useInputControl>;
  label: string;
  type?: React.ComponentProps<typeof Input>['type'];
  placeholder?: React.ComponentProps<typeof Input>['placeholder'];
  isRequired?: React.ComponentProps<typeof FormControl>['isRequired'];
  autoFocus?: boolean;
}

const AppFormControl: React.FC<Props> = ({
  inputControl,
  label,
  type = 'text',
  placeholder,
  isRequired,
  autoFocus,
}) => (
  <FormControl isInvalid={inputControl.showInvalidity} isRequired={isRequired}>
    <FormLabel>{label}</FormLabel>
    <Input
      type={type}
      placeholder={placeholder}
      value={inputControl.value}
      onChange={inputControl.changeHandler}
      onBlur={inputControl.touchHandler}
      autoFocus={autoFocus}
    />
    <FormErrorMessage>{inputControl.errorMessage}</FormErrorMessage>
  </FormControl>
);
export default AppFormControl;
