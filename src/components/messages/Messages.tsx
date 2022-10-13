import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { messagesActions, messagesActionsThunks } from '../../store/messages';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

interface Props {
  profileId: string;
}

const Messages: React.FC<Props> = ({ profileId }) => {
  const messages = useAppSelector(
    (state) => state.messages.userEntities[profileId]?.messages.list ?? []
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messagesActionsThunks.fetchMoreMessages(profileId));
  }, [profileId, dispatch]);

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
