import { Textarea } from '@chakra-ui/react';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

interface Props extends React.ComponentProps<typeof Textarea> {
  // eslint-disable-next-line react/require-default-props
  // onChange?: React.ChangeEventHandler;
}

const AutoResizedTextArea = forwardRef<any, Props>(
  ({ onChange, ...rest }, ref) => {
    const elRef = useRef<HTMLTextAreaElement>(null);

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      elRef.current!.style.height = '0';
      elRef.current!.style.height = `${elRef.current!.scrollHeight + 2}px`;
      if (onChange) onChange(event);
    };

    const clear = () => {
      elRef.current!.value = '';
    };

    useImperativeHandle(ref, () => ({
      clear,
    }));

    return (
      <Textarea
        rows={1}
        onChange={changeHandler}
        ref={elRef}
        resize="none"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    );
  }
);

export default AutoResizedTextArea;
