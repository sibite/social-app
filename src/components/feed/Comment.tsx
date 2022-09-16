import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from '../chakra-ui/Card';

interface Props {
  avatarSrc?: string;
  name: string;
  dateString: string;
  children: React.ReactNode;
}

const Comment: React.FC<Props> = ({
  avatarSrc,
  name,
  dateString,
  children,
}) => {
  const nodeColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex gap={2}>
      <Avatar name={name} src={avatarSrc} />
      <Card bgColor={nodeColor} py={2} px={3} variant="flat">
        <HStack>
          <Heading as="span" size="xs">
            {name}
          </Heading>
          <Text opacity={0.6} fontSize="sm">
            {dateString}
          </Text>
        </HStack>
        <Text>{children}</Text>
      </Card>
    </Flex>
  );
};

export default Comment;
