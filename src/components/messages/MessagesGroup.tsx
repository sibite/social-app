import { Avatar, HStack, VStack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import formatDateInformative from '../../shared/formatDateInformative';
import { useGetProfileQuery } from '../../store/profile-api';
import MessageBubble from './MessageBubble';
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

  const BubblesJSX = group.messages.map((message) => {
    const dateString = formatDateInformative(dayjs(message.date));

    return (
      <MessageBubble
        colored={!isDirectionTo}
        dateString={dateString}
        tooltipPlacement={isDirectionTo ? 'left' : 'right'}
        key={message._id}
      >
        {message.content}
      </MessageBubble>
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
          {BubblesJSX}
        </VStack>
      </HStack>
    </VStack>
  );
};
export default MessagesGroup;
