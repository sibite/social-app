import { Flex } from '@chakra-ui/react';
import { ServerToClientMessage } from '../../../server/chat-socket/socket-types';
import { useAppSelector } from '../../store/hooks';
import MessagesGroup from './MessagesGroup';
import toFancyMessages from './toFancyMessages';

interface Props {
  messages: ServerToClientMessage[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const fancyMessages = toFancyMessages(messages);

  if (!userId) return <span>Unexpected error</span>;

  return (
    <Flex
      direction="column-reverse"
      position="absolute"
      bottom="0"
      pt={4}
      w="full"
      maxH="full"
      overflowY="auto"
    >
      {fancyMessages.map((group) => (
        <MessagesGroup
          key={group.messages[0]._id}
          group={group}
          userId={userId}
        />
      ))}
    </Flex>
  );
};

export default MessageList;
