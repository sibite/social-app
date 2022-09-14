import { Avatar, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import useBackgroundColor from '../../hooks/useBackgroundColor';
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
  const cardColor = useBackgroundColor().color200;

  return (
    <Flex gap={2}>
      <Avatar name={name} src={avatarSrc} />
      <Card bgColor={cardColor} py={2} px={3}>
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
