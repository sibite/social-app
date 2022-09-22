import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import HeroIcon from '../chakra-ui/HeroIcon';

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
  <VStack spacing={4} p={4} align="stretch">
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
      <IconButton
        aria-label="Options"
        icon={<HeroIcon as={DotsVerticalIcon} />}
        variant="ghost"
      />
    </Flex>
    <Text>{children}</Text>
  </VStack>
);
export default PostHeader;
