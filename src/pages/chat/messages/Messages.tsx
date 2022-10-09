import { Box, Flex, Text } from '@chakra-ui/react';
import useMessages from '../../../hooks/useMessages';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import toFancyMessages from './toFancyMessages';

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
      <Text fontSize="xs" pl="2" pt="1" opacity="0.4">
        Stored messages are not encrypted
      </Text>
      <MessageInput profileId={profileId} />
    </Flex>
  );
};

export default Messages;
