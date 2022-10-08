import { Flex } from '@chakra-ui/react';
import Message from './Message';

interface Props {
  messages: { from: string; to: string; date: number; content: string }[];
}

const MessageList: React.FC<Props> = ({ messages }) => (
  <Flex
    direction="column-reverse"
    position="absolute"
    bottom="0"
    w="full"
    maxH="full"
    overflowY="auto"
  >
    {messages.map(({ from, to, date, content }, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Message direction="from" key={index}>
        {content}
      </Message>
    ))}
  </Flex>
);

export default MessageList;
