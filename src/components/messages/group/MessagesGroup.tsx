import { Avatar, HStack, VStack } from '@chakra-ui/react';
import dayjs from 'dayjs';
import formatDateInformative from '../../../shared/formatDateInformative';
import { useGetProfileQuery } from '../../../store/profile-api';
import { FancyMessagesGroup } from '../toFancyMessages';
import GroupMessagesList from './GroupMessagesList';
import MessagesGroupDate from './MessagesGroupDate';

interface Props {
  group: FancyMessagesGroup;
  userId: string;
}

const MessagesGroup: React.FC<Props> = ({ group, userId }) => {
  const { currentData: fromProfile } = useGetProfileQuery(group.fromId);

  const { fromId, date } = group;

  const groupDateString = date ? formatDateInformative(dayjs(date)) : undefined;
  const direction = userId === fromId ? 'to' : 'from';
  const isDirectionTo = direction === 'to';

  return (
    <VStack width="100%" spacing={0}>
      <MessagesGroupDate dateString={groupDateString} />
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
        <GroupMessagesList
          messages={group.messages}
          isDirectionTo={isDirectionTo}
        />
      </HStack>
    </VStack>
  );
};
export default MessagesGroup;
