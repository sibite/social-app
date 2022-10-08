import { Box, Flex } from '@chakra-ui/react';
import useMessages from '../../../hooks/useMessages';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface Props {
  profileId: string;
}

const Messages: React.FC<Props> = ({ profileId }) => {
  const { messages } = useMessages(profileId);

  return (
    <Flex w="full" h="full" direction="column" alignContent="stretch">
      <Box flexGrow="1" position="relative">
        <MessageList messages={messages} />
      </Box>
      <MessageInput profileId={profileId} />
    </Flex>
  );
};

export default Messages;
