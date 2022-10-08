import { Avatar, Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import useMessages from '../../../hooks/useMessages';

interface Props {
  direction: 'from' | 'to';
  name?: string;
  avatarSrc?: string;
  children: React.ReactNode;
}

const Message: React.FC<Props> = ({
  direction,
  avatarSrc,
  name = 'User',
  children,
}) => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  const isDirectionTo = direction === 'to';

  let content = [
    <Avatar size="xs" name={avatarSrc ? undefined : name} key="av" />,
    <Box
      maxW="70%"
      py={1}
      px={2}
      borderRadius={8}
      marginInlineStart={0}
      bgColor={bgColor}
      key="box"
    >
      <Text key="text" whiteSpace="pre-line">
        {children}
      </Text>
    </Box>,
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
