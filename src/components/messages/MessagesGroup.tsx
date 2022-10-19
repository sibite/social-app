import { Avatar, HStack, VStack, Text, Flex } from '@chakra-ui/react';
import dayjs from 'dayjs';
import formatDateInformative from '../../shared/formatDateInformative';
import { useGetProfileQuery } from '../../store/profile-api';
import InteractiveContent from '../misc/InteractiveContent';
import MessageBubble from './MessageBubble';
import MessageMenu from './MessageMenu';
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

  const containerStyle = {
    '&:hover .toolbar': {
      opacity: 1,
    },
  };

  const BubblesJSX = group.messages.map((message) => {
    const dateString = formatDateInformative(dayjs(message.date));

    return (
      <Flex sx={containerStyle} gap={2} key={message._id}>
        {isDirectionTo && !message.deleted && (
          <MessageMenu profileId={message.toId} messageId={message._id} />
        )}
        <MessageBubble
          colored={!isDirectionTo}
          isDeleted={message.deleted}
          dateString={dateString}
          tooltipPlacement={isDirectionTo ? 'left' : 'right'}
        >
          <InteractiveContent textContent={message.content} />
        </MessageBubble>
      </Flex>
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
