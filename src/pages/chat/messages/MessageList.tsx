import { Flex } from '@chakra-ui/react';
import { ServerToClientMessage } from '../../../../server/chat-socket/types';
import { useAppSelector } from '../../../store/hooks';
import Message from './Message';

interface Props {
  messages: ServerToClientMessage[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  const userId = useAppSelector((state) => state.auth.userId);

  return (
    <Flex
      direction="column-reverse"
      position="absolute"
      bottom="0"
      w="full"
      maxH="full"
      overflowY="auto"
    >
      {messages.map(({ fromId, toId, date, content }) => {
        const direction = userId === fromId ? 'to' : 'from';

        return (
          <Message
            key={fromId + date}
            direction={direction}
            profileId={fromId}
            date={date}
          >
            {content}
          </Message>
        );
      })}
    </Flex>
  );
};

export default MessageList;
