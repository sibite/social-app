import {
  Badge,
  Button,
  Flex,
  Grid,
  Text,
  useBoolean,
  useBreakpointValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { AnnotationIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { PostIncomingType } from '../../../server/api-types/feed';
import {
  useDeletePostMutation,
  useToggleLikeMutation,
} from '../../store/feed-api';
import { useAppSelector } from '../../store/hooks';
import HeroIcon from '../chakra-ui/HeroIcon';
import CommentsSection from './CommentsSection';
import PostHeader from './PostHeader';
import PostMediaGroup from './PostMediaGroup';
import PostMenu from './PostMenu';

interface Props {
  postId: string;
  creatorId?: string;
  avatarSrc?: string;
  media?: { _id: string; src: string }[];
  name: string;
  content?: string;
  dateString: string;
  likedBy: string[];
  commentsCount: number;
  alwaysShowComments?: boolean;
  limitHeight?: boolean;
  options: PostIncomingType['options'];
}

const Post: React.FC<Props> = ({
  postId,
  creatorId,
  avatarSrc,
  name,
  dateString,
  content,
  media = [],
  likedBy,
  commentsCount,
  alwaysShowComments = false,
  limitHeight = false,
  options = {},
}) => {
  const [removePost] = useDeletePostMutation();
  const [toggleLike] = useToggleLikeMutation();
  const [areCommentsShown, setAreCommentsShown] = useBoolean(false);
  const toast = useToast();

  const myId = useAppSelector((state) => state.auth.userId);

  const deleteHandler = (withMedia: boolean) =>
    removePost({ postId, withMedia }).unwrap();

  const likeHandler = () => toggleLike(postId);

  const shareHandler = async () => {
    const url = `${window.location.host}/post/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: 'Copied link to clipboard',
        status: 'success',
        duration: 3000,
      });
    } catch {
      toast({
        title: 'Could not copy the url to clipboard',
        status: 'error',
        duration: 4000,
      });
    }
  };

  const isLiked = myId && likedBy.indexOf(myId) !== -1;

  const isButtonTextShown =
    useBreakpointValue({ base: false, xs: true }) || alwaysShowComments;

  const fontSize = content && content.length > 40 ? 'md' : 'xl';

  const containerStyle = {
    width: '100%',
    maxHeight: '100%',
    flexDirection: 'column',
    flexWrap: 'none',
    justifyContent: 'flex-start',
  };

  return (
    <Flex sx={containerStyle} overflow="hidden">
      <VStack spacing={4} p={4} align="stretch">
        <PostHeader
          avatarSrc={avatarSrc}
          name={name}
          dateString={dateString}
          profileId={creatorId}
        >
          <PostMenu onDelete={deleteHandler} options={options} />
        </PostHeader>
        {content?.length && (
          <Text fontSize={fontSize} whiteSpace="pre-wrap">
            {content}
          </Text>
        )}
      </VStack>
      {media.length !== 0 && <PostMediaGroup postId={postId} media={media} />}
      <Flex justifyContent="space-evenly">
        <Button
          variant="ghost"
          flexGrow={1}
          colorScheme={isLiked ? 'red' : 'gray'}
          onClick={likeHandler}
          leftIcon={<HeroIcon as={isLiked ? HeartIconFilled : HeartIcon} />}
          rightIcon={
            likedBy.length ? (
              <Badge variant="subtle" colorScheme="blue">
                {likedBy.length}
              </Badge>
            ) : undefined
          }
        >
          {isButtonTextShown && 'Like'}
        </Button>
        {!alwaysShowComments && (
          <Button
            variant="ghost"
            flexGrow={1}
            leftIcon={<HeroIcon as={AnnotationIcon} />}
            rightIcon={
              commentsCount ? (
                <Badge variant="subtle" colorScheme="blue">
                  {commentsCount}
                </Badge>
              ) : undefined
            }
            onClick={setAreCommentsShown.toggle}
          >
            {isButtonTextShown && 'Comments'}
          </Button>
        )}
        <Button
          variant="ghost"
          flexGrow={1}
          leftIcon={<HeroIcon as={ShareIcon} />}
          onClick={shareHandler}
        >
          {isButtonTextShown && 'Share'}
        </Button>
      </Flex>
      {(areCommentsShown || alwaysShowComments) && (
        <CommentsSection postId={postId} limitHeight={limitHeight} />
      )}
    </Flex>
  );
};

export default Post;
