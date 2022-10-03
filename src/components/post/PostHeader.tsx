import { Avatar, Flex, Heading, Text, VStack } from '@chakra-ui/react';

interface Props {
  avatarSrc?: string;
  name: string;
  dateString: string;
  children?: React.ReactNode;
}

const PostHeader: React.FC<Props> = ({
  avatarSrc,
  name,
  dateString,
  children,
}) => (
  <Flex align="center" gap={2}>
    <Avatar name={avatarSrc ? undefined : name} src={avatarSrc} />
    <VStack align="flex-start" flexGrow={1} spacing={0}>
      <Heading as="span" size="sm">
        {name}
      </Heading>
      <Text opacity={0.6} fontSize="sm">
        {dateString}
      </Text>
    </VStack>
    {children}
  </Flex>
);
export default PostHeader;
