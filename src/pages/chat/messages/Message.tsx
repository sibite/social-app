import {
  Avatar,
  Box,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import formatDateInformative from '../../../shared/formatDateInformative';
import { useGetProfileQuery } from '../../../store/profile-api';

interface Props {
  profileId: string;
  date?: number;
  direction: 'from' | 'to';
  children: React.ReactNode;
}

const Message: React.FC<Props> = ({ profileId, date, direction, children }) => {
  const { currentData } = useGetProfileQuery(profileId);

  const dateString = formatDateInformative(dayjs(date));

  const isDirectionTo = direction === 'to';

  const darkBgColor = isDirectionTo ? 'gray.700' : 'blue.700';
  const lightBgColor = isDirectionTo ? 'gray.200' : 'blue.100';

  const bgColor = useColorModeValue(lightBgColor, darkBgColor);

  let content = [
    !isDirectionTo && (
      <Avatar
        size="xs"
        name={currentData?.avatarSrc ? undefined : currentData?.name}
        src={currentData?.avatarSrc}
        key="av"
        mb={1}
        alignSelf="flex-end"
      />
    ),
    <Tooltip
      key="box"
      placement={isDirectionTo ? 'left' : 'right'}
      label={dateString}
      aria-label={`A tooltip (${dateString})`}
    >
      <Box
        maxW="70%"
        py="6px"
        px="11px"
        borderRadius={8}
        marginInlineStart={0}
        bgColor={bgColor}
      >
        <Text key="text" whiteSpace="pre-wrap">
          {children}
        </Text>
      </Box>
    </Tooltip>,
  ];

  content = isDirectionTo ? content.reverse() : content;

  return (
    <HStack
      p={2}
      spacing={2}
      justifyContent={isDirectionTo ? 'flex-end' : 'flex-start'}
    >
      {content}
    </HStack>
  );
};

export default Message;
