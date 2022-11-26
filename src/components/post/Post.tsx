import {
  BoxProps,
  Flex,
  Text,
  useBoolean,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { PostIncomingType } from '../../../server/api-types/feed';
import { useDeletePostMutation } from '../../store/feed-api';
import { useAppSelector } from '../../store/hooks';
import InteractiveContent from '../misc/InteractiveContent';
import CommentsSection from './comments/CommentsSection';
import PostButtons from './PostButtons';
import PostContext from './PostContext';
import PostHeader from './PostHeader';
import PostMediaGroup from './PostMediaGroup';
import PostMenu from './PostMenu';

interface Props {
  postId: string;
  creatorId?: string;
  avatarSrc?: string;
  media?: { _id: string; src?: string }[];
  name: string;
  content?: string;
  dateString: string;
  likedBy: string[];
  commentsCount: number;
  alwaysShowComments?: boolean;
  limitHeight?: boolean;
  options: PostIncomingType['options'];
  commentColor?: BoxProps['bgColor'];
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
  commentColor,
}) => {
  const [removePost] = useDeletePostMutation();
  const [areCommentsShown, setAreCommentsShown] = useBoolean(false);

  const myId = useAppSelector((state) => state.auth.userId);

  const deleteHandler = (withMedia: boolean) =>
    removePost({ postId, withMedia }).unwrap();

  const isLiked = !!myId && likedBy.indexOf(myId) !== -1;

  const fontSize = content && content.length > 40 ? 'md' : 'xl';

  const containerStyle = {
    width: '100%',
    maxHeight: '100%',
    flexDirection: 'column',
    flexWrap: 'none',
    justifyContent: 'flex-start',
  };

  const defaultCommentColor = useColorModeValue('gray.100', 'gray.700');

  const postContextValue = useMemo(
    () => ({
      commentColor: commentColor ?? defaultCommentColor,
    }),
    [commentColor, defaultCommentColor]
  );

  return (
    <PostContext.Provider value={postContextValue}>
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
          {content && (
            <Text fontSize={fontSize} whiteSpace="pre-wrap">
              <InteractiveContent textContent={content} />
            </Text>
          )}
        </VStack>
        {media && <PostMediaGroup postId={postId} media={media} />}
        <PostButtons
          commentsCount={commentsCount}
          isLiked={isLiked}
          numOfLikes={likedBy.length}
          onCommentsToggle={setAreCommentsShown.toggle}
          postId={postId}
          alwaysShowComments={alwaysShowComments}
        />
        {(areCommentsShown || alwaysShowComments) && (
          <CommentsSection postId={postId} limitHeight={limitHeight} />
        )}
      </Flex>
    </PostContext.Provider>
  );
};

export default Post;
