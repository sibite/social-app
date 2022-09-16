import { Avatar, Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';

interface Props {
  direction: 'from' | 'to';
  name?: string;
  children: React.ReactNode;
}

const Message: React.FC<Props> = ({ direction, name = 'User', children }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  const isDirectionTo = direction === 'to';

  let content = [
    <Avatar size="xs" name={name} />,
    <Box
      maxW="70%"
      py={1}
      px={2}
      borderRadius={8}
      marginInlineStart={0}
      bgColor={bgColor}
    >
      <Text>{children}</Text>
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
