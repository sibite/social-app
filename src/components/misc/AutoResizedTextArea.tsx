import { Textarea } from '@chakra-ui/react';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

type Props = React.ComponentProps<typeof Textarea>;

const AutoResizedTextArea = forwardRef<any, Props>(
  ({ onChange, ...rest }, ref) => {
    const elRef = useRef<HTMLTextAreaElement>(null);

    const resize = useCallback(() => {
      const { style } = elRef.current!;
      style.removeProperty('height');
      style.setProperty('overflow', 'hidden');
      style.setProperty('overflowY', 'hidden');
      style.height = `${elRef.current!.scrollHeight + 2}px`;
      style.removeProperty('overflowY');
      style.removeProperty('overflow');
    }, [elRef]);

    useEffect(() => resize(), [resize, rest.value]);

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
        overflowY="auto"
        maxHeight="100%"
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    );
  }
);

export default AutoResizedTextArea;
