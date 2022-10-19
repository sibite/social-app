import {
  Badge,
  Button,
  Flex,
  Text,
  useBoolean,
  useBreakpointValue,
  useToast,
  UseToastOptions,
  VStack,
} from '@chakra-ui/react';
import { AnnotationIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { PostIncomingType } from '../../../server/api-types/feed';
import useMobileModeValue from '../../hooks/useIsMobile';
import {
  useDeletePostMutation,
  useToggleLikeMutation,
} from '../../store/feed-api';
import { useAppSelector } from '../../store/hooks';
import HeroIcon from '../chakra-ui/HeroIcon';
import InteractiveContent from '../misc/InteractiveContent';
import CommentsSection from './CommentsSection';
import PostHeader from './PostHeader';
import PostMediaGroup from './PostMediaGroup';
import PostMenu from './PostMenu';
import SharePopover from './SharePopover';

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

  const toastPosition = useMobileModeValue('top', 'bottom');
  const myId = useAppSelector((state) => state.auth.userId);
  const url = `${window.location.origin}/post/${postId}`;

  const deleteHandler = (withMedia: boolean) =>
    removePost({ postId, withMedia }).unwrap();

  const likeHandler = () => toggleLike(postId);

  const shareHandler = async () => {
    const successToast: UseToastOptions = {
      title: 'Copied link to clipboard',
      position: toastPosition,
      status: 'success',
      duration: 3000,
    };

    try {
      await (navigator.permissions.query as any)({
        name: 'clipboard-write',
      });
      await navigator.clipboard.writeText(url);
      toast(successToast);
    } catch {
      if (!document.execCommand)
        toast({
          title: 'Could not copy the url to clipboard',
          position: toastPosition,
          status: 'error',
          duration: 4000,
        });
      else setTimeout(() => toast(successToast), 250);
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
            <InteractiveContent textContent={content} />
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
        <SharePopover url={url}>
          <Button
            variant="ghost"
            flexGrow={1}
            leftIcon={<HeroIcon as={ShareIcon} />}
            onClick={shareHandler}
          >
            {isButtonTextShown && 'Share'}
          </Button>
        </SharePopover>
      </Flex>
      {(areCommentsShown || alwaysShowComments) && (
        <CommentsSection postId={postId} limitHeight={limitHeight} />
      )}
    </Flex>
  );
};

export default Post;
