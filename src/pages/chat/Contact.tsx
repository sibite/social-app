import {
  Avatar,
  Circle,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ServerToClientMessage } from '../../../server/chat-socket/socket-types';
import formatDateRelativeShort from '../../shared/formatDateRelativeShort';
import { useAppSelector } from '../../store/hooks';
import { useGetProfileQuery } from '../../store/profile-api';

interface Props {
  profileId: string;
  lastMessage?: ServerToClientMessage;
  unread?: boolean;
  onSelect?: Function;
}

const Contacts: React.FC<Props> = ({
  profileId,
  lastMessage,
  unread = false,
  onSelect = () => null,
}) => {
  const { currentData: contact } = useGetProfileQuery(profileId);
  const [lastMessageDateString, setLastMessageDateString] = useState('');
  const myId = useAppSelector((state) => state.auth.userId);
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const activeColor = useColorModeValue('gray.200', 'gray.800');

  let lastMessageContent;
  if (lastMessage) {
    const prefix = lastMessage.fromId === myId ? 'You: ' : '';
    if (lastMessage.deleted)
      lastMessageContent = (
        <span>
          {prefix} <i>Message deleted</i>
        </span>
      );
    else lastMessageContent = prefix + lastMessage.content;
  }

  useEffect(() => {
    if (lastMessage)
      setLastMessageDateString(
        formatDateRelativeShort(dayjs(lastMessage.date))
      );
    const interval = setInterval(() => {
      if (lastMessage)
        setLastMessageDateString(
          formatDateRelativeShort(dayjs(lastMessage.date))
        );
    }, 60e3);
    return () => clearInterval(interval);
  }, [lastMessage]);

  const style = {
    alignItems: 'center',
    w: 'full',
    p: 3,
    borderRadius: 8,
    '&:hover': {
      bgColor,
    },
    '&:active': {
      bgColor: activeColor,
    },
    transition: 'all 200ms',
  };

  const activeStyle = {
    '&, &:hover, &:active': {
      bgColor: useColorModeValue('blue.75', 'blue.950'),
    },
  };

  const headingStyle = {
    fontWeight: unread ? 'bold' : 'medium',
    flexGrow: '1',
    maxWidth: '100%',
    lineHeight: 'unset',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  };

  const clickHandler = () => onSelect();

  return (
    <Flex
      as={NavLink}
      _activeLink={activeStyle}
      sx={style}
      onClick={clickHandler}
      to={`/messages/${profileId}`}
    >
      <Avatar
        size="md"
        src={contact?.avatarSrc}
        name={contact?.avatarSrc ? undefined : contact?.fullName}
        mr={3}
      />
      <VStack
        spacing={0}
        alignItems="flex-start"
        overflow="hidden"
        flexGrow="1"
      >
        <Heading as="h2" size="sm" sx={headingStyle}>
          {contact?.fullName ?? 'User'}
        </Heading>
        {lastMessageContent && (
          <Flex
            overflow="hidden"
            width="100%"
            justifyContent="space-between"
            gap={2}
          >
            <Text
              opacity="0.7"
              fontSize="sm"
              flexShrink="1"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {lastMessageContent}
            </Text>
            <Text opacity="0.4" fontSize="sm" whiteSpace="nowrap">
              {lastMessageDateString}
            </Text>
          </Flex>
        )}
      </VStack>
      {unread && <Circle background="blue.400" size={3} ml={1} />}
    </Flex>
  );
};

export default Contacts;
