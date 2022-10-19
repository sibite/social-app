/* eslint-disable react/require-default-props */
import { Box, Input } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

interface Props {
  multiple?: boolean;
  accept?: string;
  capture?: 'user' | 'environment' | undefined;
  children: React.ReactNode;
  onChange?: React.ChangeEventHandler;
}

const CustomFilePicker: React.FC<Props> = ({
  onChange,
  children,
  multiple = false,
  accept,
  capture,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [key, setKey] = useState(0);

  const openFileInput = () => fileInputRef.current?.click();

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
    setKey(Math.random());
  };

  return (
    <Box onClick={openFileInput}>
      {children}
      <Input
        display="none"
        type="file"
        key={key}
        multiple={multiple}
        accept={accept}
        capture={capture}
        onChange={fileChangeHandler}
        ref={fileInputRef}
      />
    </Box>
  );
};

export default CustomFilePicker;
