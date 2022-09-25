import { Badge, Button, Grid, Image, Text, VStack } from '@chakra-ui/react';
import { AnnotationIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid';
import { PostIncomingType } from '../../../server/api-types/feed';
import {
  useDeletePostMutation,
  useToggleLikeMutation,
} from '../../store/feed-api';
import { useAppSelector } from '../../store/hooks';
import { Comment } from '../../store/profile';
import HeroIcon from '../chakra-ui/HeroIcon';
import CommentsSection from './CommentsSection';
import PostHeader from './PostHeader';
import PostMenu from './PostMenu';

interface Props {
  postId: string;
  avatarSrc?: string;
  media?: { _id: string; src: string }[];
  name: string;
  content?: string;
  dateString: string;
  likedBy: string[];
  comments: Comment[];
  alwaysShowComments?: boolean;
  options: PostIncomingType['options'];
}

const Post: React.FC<Props> = ({
  postId,
  avatarSrc,
  name,
  dateString,
  content,
  media = [],
  likedBy,
  comments,
  alwaysShowComments = false,
  options = {},
}) => {
  const [removePost] = useDeletePostMutation();
  const [toggleLike] = useToggleLikeMutation();

  const myId = useAppSelector((state) => state.auth.userId);

  const deleteHandler = (withMedia: boolean) => {
    removePost({ postId, withMedia });
  };

  const likeHandler = () => toggleLike(postId);

  const liked = myId && likedBy.indexOf(myId) !== -1;

  const fontSize = content && content.length > 40 ? 'md' : 'xl';

  return (
    <>
      <VStack spacing={4} p={4} align="stretch">
        <PostHeader avatarSrc={avatarSrc} name={name} dateString={dateString}>
          <PostMenu onDelete={deleteHandler} options={options} />
        </PostHeader>
        {content?.length && (
          <Text fontSize={fontSize} whiteSpace="pre-wrap">
            {content}
          </Text>
        )}
      </VStack>
      <VStack>
        {media.map(({ _id, src }) => (
          <Image src={src} key={_id} />
        ))}
      </VStack>
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
              comments.length ? (
                <Badge variant="subtle" colorScheme="blue">
                  {comments.length}
                </Badge>
              ) : undefined
            }
          >
            Comments
          </Button>
        )}
        <Button variant="ghost" leftIcon={<HeroIcon as={ShareIcon} />}>
          Share
        </Button>
      </Grid>
      {comments.length > 0 && <CommentsSection comments={comments} />}
    </>
  );
};

export default Post;
