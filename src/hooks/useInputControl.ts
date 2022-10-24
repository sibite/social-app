import { useState } from 'react';

export interface InputOptions {
  initialValue?: string;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

function useInputControl({
  initialValue = '',
  validator = () => true,
  errorMessage = 'Invalid input',
}: InputOptions) {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const touchHandler = () => setIsTouched(true);
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.currentTarget.value);
  const reset = () => {
    setValue(initialValue);
    setIsTouched(false);
  };

  const isInvalid = !validator(value);
  const showInvalidity = isInvalid && isTouched;

  return {
    isInvalid,
    isTouched,
    showInvalidity,
    errorMessage,
    value,
    touchHandler,
    changeHandler,
    reset,
  };
}

export default useInputControl;
