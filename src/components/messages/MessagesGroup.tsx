import { Avatar, HStack, Text, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import formatDateInformative from '../../shared/formatDateInformative';
import { useGetProfileQuery } from '../../store/profile-api';
import Message from './Message';
import { FancyMessagesGroup } from './toFancyMessages';

interface Props {
  group: FancyMessagesGroup;
  userId: string;
}

const MessagesGroup: React.FC<Props> = ({ group, userId }) => {
  const { currentData: fromProfile } = useGetProfileQuery(group.fromId);

  const { fromId, date } = group;

  const groupDateString = date && formatDateInformative(dayjs(date));
  const direction = userId === fromId ? 'to' : 'from';
  const isDirectionTo = direction === 'to';

  const MessagesJSX = group.messages.map((message) => {
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
    <VStack width="100%" spacing={0}>
      {groupDateString && (
        <Text
          width="100%"
          pt={3}
          textAlign="center"
          fontSize="xs"
          opacity="0.7"
        >
          {groupDateString}
        </Text>
      )}
      <HStack
        p={2}
        spacing={2}
        maxW="90%"
        alignSelf={isDirectionTo ? 'flex-end' : 'flex-start'}
      >
        {!isDirectionTo && (
          <Avatar
            size="xs"
            name={fromProfile?.avatarSrc ? undefined : fromProfile?.fullName}
            src={fromProfile?.avatarSrc}
            alignSelf="flex-end"
          />
        )}
        <VStack
          spacing="2px"
          alignItems={isDirectionTo ? 'flex-end' : 'flex-start'}
        >
          {MessagesJSX}
        </VStack>
      </HStack>
    </VStack>
  );
};
export default MessagesGroup;
