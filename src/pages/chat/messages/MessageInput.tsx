import { HStack, IconButton } from '@chakra-ui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import HeroIcon from '../../../components/chakra-ui/HeroIcon';
import AutoResizedTextArea from '../../../components/misc/AutoResizedTextArea';
import useMessages from '../../../hooks/useMessages';

interface Props {}

const MessagesInput: React.FC<Props> = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useMessages('test');
  const textAreaRef = useRef<any>();

  const sendHandler = () => {
    sendMessage(message);
    textAreaRef.current.clear();
  };

  const contentChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.currentTarget.value);
  };

  const textAreaKeyPressHandler = (event: React.KeyboardEvent) => {
    if (event.code !== 'Enter' || event.shiftKey) return;

    event.preventDefault();
    sendHandler();
  };

  return (
    <HStack p={2}>
      <AutoResizedTextArea
        ref={textAreaRef}
        flexGrow="1"
        onChange={contentChangeHandler}
        onKeyPress={textAreaKeyPressHandler}
      />
      <IconButton
        icon={<HeroIcon as={ChevronDoubleRightIcon} />}
        aria-label="Send message"
        onClick={sendHandler}
      />
    </HStack>
  );
};

export default MessagesInput;
