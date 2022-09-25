import { Badge, Button, Grid, Image, Text, VStack } from '@chakra-ui/react';
import { AnnotationIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { PostIncomingType } from '../../../server/api-types/feed';
import { useDeletePostMutation } from '../../store/feed-api';
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
  likes: number;
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
  likes,
  comments,
  alwaysShowComments = false,
  options = {},
}) => {
  const fontSize = content && content.length > 30 ? 'md' : 'xl';
  const [removePost, result] = useDeletePostMutation();

  const deleteHandler = (withMedia: boolean) => {
    removePost({ postId, withMedia });
  };

  return (
    <>
      <VStack spacing={4} p={4} align="stretch">
        <PostHeader avatarSrc={avatarSrc} name={name} dateString={dateString}>
          <PostMenu onDelete={deleteHandler} options={options} />
        </PostHeader>
        <Text fontSize={fontSize}>{content}</Text>
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
