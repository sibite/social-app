import {
  Badge,
  Button,
  Flex,
  Grid,
  Text,
  useBoolean,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { AnnotationIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { useLocation, generatePath } from 'react-router-dom';
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

  const liked = myId && likedBy.indexOf(myId) !== -1;

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
      <Grid
        templateRows="1fr"
        templateColumns={`repeat(${alwaysShowComments ? 2 : 3}, 1fr)`}
      >
        <Button
          variant="ghost"
          colorScheme={liked ? 'red' : 'gray'}
          onClick={likeHandler}
          leftIcon={<HeroIcon as={liked ? HeartIconFilled : HeartIcon} />}
          rightIcon={
            likedBy.length ? (
              <Badge variant="subtle" colorScheme="blue">
                {likedBy.length}
              </Badge>
            ) : undefined
          }
        >
          Like
        </Button>
        {!alwaysShowComments && (
          <Button
            variant="ghost"
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
            Comments
          </Button>
        )}
        <Button
          variant="ghost"
          leftIcon={<HeroIcon as={ShareIcon} />}
          onClick={shareHandler}
        >
          Share
        </Button>
      </Grid>
      {(areCommentsShown || alwaysShowComments) && (
        <CommentsSection postId={postId} limitHeight={limitHeight} />
      )}
    </Flex>
  );
};

export default Post;
