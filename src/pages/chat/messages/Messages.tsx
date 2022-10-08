import { Box, Flex } from '@chakra-ui/react';
import useMessages from '../../../hooks/useMessages';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface Props {}

const Messages: React.FC<Props> = () => {
  const { messages } = useMessages('test');

  return (
    <Flex w="full" h="full" direction="column" alignContent="stretch">
      <Box flexGrow="1" position="relative">
        <MessageList messages={messages} />
      </Box>
      <MessageInput />
    </Flex>
  );
};

export default Messages;
