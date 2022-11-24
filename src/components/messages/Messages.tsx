import { Box, Flex, Text } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { messagesActionsThunks } from '../../store/messages/messages';
import MessageInput from './MessageInput';
import MessagesOfflineAlert from './MessagesOfflineAlert';
import MessagingContainer from './MessagingContainer';

interface Props {
  profileId: string;
}

const Messages: React.FC<Props> = ({ profileId }) => {
  const dispatch = useAppDispatch();
  const userEntity = useAppSelector(
    (state) => state.messages.userEntities[profileId]
  );

  const { status, isComplete } = userEntity ?? {};

  const messagesList = userEntity?.messages.list ?? [];
  const awaitingMessages = userEntity?.awaitingMessages ?? [];

  const fetchMoreMessages = useCallback(() => {
    dispatch(messagesActionsThunks.fetchMoreMessages(profileId));
  }, [dispatch, profileId]);

  return (
    <Flex w="full" h="full" direction="column" alignContent="stretch">
      <MessagesOfflineAlert />
      <Box flexGrow="1" position="relative">
        <MessagingContainer
          isLoading={status === 'loading'}
          isComplete={isComplete}
          messages={messagesList}
          awaitingMessages={awaitingMessages}
          fetchMoreMessages={fetchMoreMessages}
        />
      </Box>
      <Text fontSize="xs" pl="2" pt="1" opacity="0.4">
        Stored messages are not encrypted
      </Text>
      <MessageInput profileId={profileId} />
    </Flex>
  );
};

export default Messages;
