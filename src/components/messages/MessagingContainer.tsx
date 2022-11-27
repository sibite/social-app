import { Center, Flex, Spinner, Text } from '@chakra-ui/react';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { ServerToClientMessage } from '../../../server/chat-socket/socket-types';
import { useAppSelector } from '../../store/hooks';
import { AwaitingMessage } from '../../store/messages/messages';
import MessagesGroup from './group/MessagesGroup';
import toFancyMessages from './toFancyMessages';

interface Props {
  messages: ServerToClientMessage[];
  awaitingMessages?: AwaitingMessage[];
  isLoading?: boolean;
  isComplete?: boolean;
  fetchMoreMessages: () => any;
}

let lastScroll: number;
const scrollTreshold = 1;

const getScrollDiff = (el: Element) =>
  el.scrollHeight - (el.clientHeight - el.scrollTop);

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

  const scrollHandler = () => {
    const diff = getScrollDiff(listRef.current!);
    lastScroll = listRef.current!.scrollTop;
    if (diff < scrollTreshold && !isComplete) {
      fetchMoreMessages();
    }
  };

  const checkForScroll = useCallback(() => {
    if (getScrollDiff(listRef.current!) < scrollTreshold) {
      fetchMoreMessages();
    }
  }, [fetchMoreMessages]);

  useLayoutEffect(() => {
    const diff = getScrollDiff(listRef.current!);
    if (diff < scrollTreshold) listRef.current!.scrollTo({ top: lastScroll });

    checkForScroll();
    window.addEventListener('resize', checkForScroll);
    return () => {
      window.removeEventListener('resize', checkForScroll);
    };
  }, [messages.length, checkForScroll]);

  const style = {
    flexDirection: 'column-reverse',
    position: 'absolute',
    bottom: '0',
    paddingTop: 4,
    width: 'full',
    maxHeight: 'full',
    overflowY: 'auto',
    overscrollBehavior: 'none',
  };

  if (!userId) return <span>Unexpected error</span>;

  return (
    <Flex sx={style} onScroll={scrollHandler} ref={listRef}>
      {fancyMessages.map((group) => (
        <MessagesGroup key={group.id} group={group} userId={userId} />
      ))}
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
    </Flex>
  );
};

export default MessagingContainer;
