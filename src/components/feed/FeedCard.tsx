import { ChatIcon, HamburgerIcon, LinkIcon, StarIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  AnnotationIcon,
  DotsVerticalIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/outline';
import Card from '../chakra-ui/Card';
import HeroIcon from '../chakra-ui/HeroIcon';
import CommentsSection from './CommentsSection';

interface Props {
  avatarSrc?: string;
  name: string;
  dateString: string;
  photoSrc?: string;
  likes: number;
  comments: any[];
  children: React.ReactNode;
}

const FeedCard: React.FC<Props> = ({
  avatarSrc,
  name,
  dateString,
  photoSrc,
  likes,
  comments,
  children,
}) => (
  <Card>
    <VStack spacing={4} p={4} align="stretch">
      <Flex align="center" gap={2}>
        <Avatar name={name} src={avatarSrc} />
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
    {photoSrc && <Image src={photoSrc} />}
    <Grid templateRows="1fr" templateColumns="repeat(3, 1fr)">
      <Button
        variant="ghost"
        leftIcon={<HeroIcon as={HeartIcon} />}
        rightIcon={
          likes ? (
            <Badge variant="subtle" colorScheme="blue">
              {likes}
            </Badge>
          ) : undefined
        }
      >
        Like
      </Button>
      <Button
        variant="ghost"
        leftIcon={<HeroIcon as={AnnotationIcon} />}
        rightIcon={
          comments.length ? (
            <Badge variant="subtle" colorScheme="blue">
              {comments.length}
            </Badge>
          ) : undefined
        }
      >
        Comments
      </Button>
      <Button variant="ghost" leftIcon={<HeroIcon as={ShareIcon} />}>
        Share
      </Button>
    </Grid>
    <CommentsSection comments={comments} />
  </Card>
);

export default FeedCard;
