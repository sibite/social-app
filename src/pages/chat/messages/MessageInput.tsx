import { HStack, IconButton } from '@chakra-ui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/outline';
import React, { useRef, useState } from 'react';
import HeroIcon from '../../../components/chakra-ui/HeroIcon';
import AutoResizedTextArea from '../../../components/misc/AutoResizedTextArea';
import useMessages from '../../../hooks/useMessages';

interface Props {
  profileId: string;
}

const MessagesInput: React.FC<Props> = ({ profileId }) => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useMessages(profileId);
  const textAreaRef = useRef<any>();

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
