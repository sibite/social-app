import { Textarea } from '@chakra-ui/react';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';

interface Props extends React.ComponentProps<typeof Textarea> {
  // eslint-disable-next-line react/require-default-props
  // onChange?: React.ChangeEventHandler;
}

const AutoResizedTextArea = forwardRef<any, Props>(
  ({ onChange, ...rest }, ref) => {
    const elRef = useRef<HTMLTextAreaElement>(null);

    const resize = useCallback(() => {
      const { style } = elRef.current!;
      style.removeProperty('height');
      style.height = `${elRef.current!.scrollHeight + 2}px`;
    }, [elRef]);

    const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      resize();
      if (onChange) onChange(event);
    };

    const clear = () => {
      elRef.current!.value = '';
      resize();
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
        overflowY="hidden"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    );
  }
);

export default AutoResizedTextArea;
