import { Flex } from '@chakra-ui/react';
import Message from './Message';

interface Props {}

const MessageList: React.FC<Props> = () => (
  <Flex
    direction="column-reverse"
    position="absolute"
    bottom="0"
    w="full"
    maxH="full"
    overflowY="auto"
  >
    <Message direction="from">I&apos;m not so good</Message>
    <Message direction="to">Hey, I&apos;m fine. What about you?</Message>
    <Message direction="from">Hi, how are you?</Message>
  </Flex>
);

export default MessageList;
