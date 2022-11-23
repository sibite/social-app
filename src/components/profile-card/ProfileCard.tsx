import { Avatar, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import AppCard from '../chakra-ui/AppCard';
import ProfileCardFollowButton from './ProfileCardFollowButton';

type Props = {
  avatarSrc?: string;
  fullName?: string;
  description?: string;
  rightButton?: React.ReactNode;
};

const ProfileCard: React.FC<Props> = ({
  fullName,
  description,
  avatarSrc,
  rightButton,
}) => (
  <AppCard variant="clickable" px={4} py={4} as="button" width="100%">
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
      {rightButton}
    </Flex>
  </AppCard>
);
export default ProfileCard;
