import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import { ServerToClientMessage } from '../../../server/chat-socket/socket-types';
import { useAppSelector } from '../../store/hooks';
import { AwaitingMessage } from '../../store/messages/messages';
import MessagesGroup from './group/MessagesGroup';
import toFancyMessages from './toFancyMessages';
import useMessagesScroll from './useMessagesScroll';
import useOnMessageSent from './useOnMessageSent';

interface Props {
  messages: ServerToClientMessage[];
  awaitingMessages?: AwaitingMessage[];
  isLoading?: boolean;
  isComplete?: boolean;
  fetchMoreMessages: () => any;
}

const MessagingContainer: React.FC<Props> = ({
  messages,
  awaitingMessages = [],
  isLoading,
  isComplete,
  fetchMoreMessages,
}) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const fancyMessages = toFancyMessages(messages, awaitingMessages);
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollHandler, reset } = useMessagesScroll({
    deps: [messages.length, awaitingMessages.length],
    elRef: listRef,
    infiniteScrollCallback: fetchMoreMessages,
    treshold: 1,
    isComplete: !!isComplete,
  });

  useOnMessageSent(reset);

  const style = {
    flexDirection: 'column',
    paddingTop: 4,
    width: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
    overscrollBehavior: 'none',
  };

  if (!userId) return <span>Unexpected error</span>;

  return (
    <Flex sx={style} onScroll={scrollHandler} ref={listRef}>
      <Center boxSize="100%" pt={5} pb={8}>
        {!isComplete && (
          <Spinner visibility={isLoading ? 'visible' : 'hidden'} />
        )}
        {isComplete && (
          <Text opacity="0.7" fontSize="xs">
            Beginning of conversation
          </Text>
        )}
      </Center>
      {fancyMessages.reverse().map((group) => (
        <MessagesGroup key={group.id} group={group} userId={userId} />
      ))}
    </Flex>
  );
};

export default MessagingContainer;
