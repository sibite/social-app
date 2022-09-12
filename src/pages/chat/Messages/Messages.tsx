import { Box, Flex } from '@chakra-ui/react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface Props {}

const Messages: React.FC<Props> = () => (
  <Flex w="full" h="full" direction="column" alignContent="stretch">
    <Box flexGrow="1" position="relative">
      <MessageList />
    </Box>
    <MessageInput />
  </Flex>
);

export default Messages;
