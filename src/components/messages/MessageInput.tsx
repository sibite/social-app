import { HStack, IconButton } from '@chakra-ui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import useMessagesSender from '../../hooks/useMessagesSender';
import HeroIcon from '../chakra-ui/HeroIcon';
import AutoResizedTextArea from '../misc/AutoResizedTextArea';

interface Props {
  profileId: string;
}

const savedInputs: { [key: string]: string } = {};

const MessagesInput: React.FC<Props> = ({ profileId }) => {
  const [message, setMessage] = useState(savedInputs[profileId] ?? '');
  const { sendMessage } = useMessagesSender(profileId);
  const textAreaRef = useRef<any>();

  savedInputs[profileId] = message;

  const sendHandler = () => {
    sendMessage(message);
    textAreaRef.current.clear();
    setMessage('');
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
    <HStack p={2} maxHeight="25vh">
      <AutoResizedTextArea
        ref={textAreaRef}
        placeholder="Type your message"
        flexGrow="1"
        defaultValue={message}
        onChange={contentChangeHandler}
        onKeyPress={textAreaKeyPressHandler}
      />
      <IconButton
        icon={<HeroIcon as={ChevronDoubleRightIcon} />}
        aria-label="Send message"
        onClick={() => {
          sendHandler();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          sendHandler();
        }}
      />
    </HStack>
  );
};

export default MessagesInput;
