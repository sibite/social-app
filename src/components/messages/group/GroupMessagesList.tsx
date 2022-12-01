import { VStack } from '@chakra-ui/react';
import formatDateInformative from '../../../shared/formatDateInformative';
import Message from './Message';
import { FancyMessagesGroup } from '../toFancyMessages';
import getDayjsInstance from '../../../shared/getDayjsInstance';

const dayjs = getDayjsInstance();

interface Props {
  messages: FancyMessagesGroup['messages'];
  isDirectionTo: boolean;
}

const GroupMessagesList: React.FC<Props> = ({ messages, isDirectionTo }) => {
  const MessagesJSX = messages.map((message) => {
    if ('_id' in message) {
      const dateString = formatDateInformative(dayjs(message.date));

      return (
        <Message
          key={message._id}
          messageId={message._id}
          content={message.content}
          dateString={dateString}
          isDeleted={message.deleted ?? false}
          isDirectionTo={isDirectionTo}
          toId={message.toId}
        />
      );
    }
    const dateString = 'Sending...';

    return (
      <Message
        key={message.ref}
        content={message.content}
        dateString={dateString}
        isDeleted={false}
        isSending
        isDirectionTo
        toId={message.toId}
      />
    );
  });

  return (
    <VStack
      spacing="2px"
      alignItems={isDirectionTo ? 'flex-end' : 'flex-start'}
    >
      {MessagesJSX}
    </VStack>
  );
};
export default GroupMessagesList;
