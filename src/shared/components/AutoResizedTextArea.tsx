import { Textarea } from '@chakra-ui/react';
import React, { ReactPropTypes, useRef, useState } from 'react';

interface Props extends React.ComponentProps<typeof Textarea> {
  // eslint-disable-next-line react/require-default-props
  // onChange?: React.ChangeEventHandler;
}

const AutoResizedTextArea: React.FC<Props> = ({ onChange, ...rest }) => {
  const [height, setHeight] = useState<string>();
  const elRef = useRef<HTMLTextAreaElement>(null);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    elRef.current!.style.height = '0';
    elRef.current!.style.height = `${elRef.current!.scrollHeight + 2}px`;
    // setHeight(`${elRef.current!.scrollHeight}px`);
    if (onChange) onChange(event);
  };

  return (
    <Textarea
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      // height={height}
      rows={1}
      onChange={changeHandler}
      ref={elRef}
      resize="none"
    />
  );
};

export default AutoResizedTextArea;
