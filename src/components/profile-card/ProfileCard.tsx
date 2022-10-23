import { Avatar, Text, Flex, Heading, VStack } from '@chakra-ui/react';
import Card from '../chakra-ui/Card';

type Props = {
  avatarSrc?: string;
  fullName?: string;
  description?: string;
};

const ProfileCard: React.FC<Props> = ({ fullName, description, avatarSrc }) => (
  <Card variant="clickable" px={4} py={4} as="button" width="100%">
    <Flex align="center" gap={2}>
      <Avatar name={avatarSrc ? undefined : fullName} src={avatarSrc} />
      <VStack
        align="flex-start"
        flexGrow={1}
        spacing={1}
        ml={1}
        overflow="hidden"
      >
        <Heading as="span" size="sm">
          {fullName}
        </Heading>
        <Text
          opacity={0.6}
          fontSize="sm"
          maxWidth="100%"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {description}
        </Text>
      </VStack>
    </Flex>
  </Card>
);
export default ProfileCard;
