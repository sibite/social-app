import { Badge, Button, Grid, Image, Text, VStack } from '@chakra-ui/react';
import { AnnotationIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { Comment } from '../../store/profile';
import HeroIcon from '../chakra-ui/HeroIcon';
import CommentsSection from './CommentsSection';
import PostHeader from './PostHeader';

interface Props {
  avatarSrc?: string;
  media?: { _id: string; src: string }[];
  name: string;
  content?: string;
  dateString: string;
  likes: number;
  comments: Comment[];
  alwaysShowComments?: boolean;
}

const Post: React.FC<Props> = ({
  avatarSrc,
  media = [],
  name,
  content,
  dateString,
  likes,
  comments,
  alwaysShowComments = false,
}) => {
  const fontSize = content && content.length > 30 ? 'md' : 'xl';
  return (
    <>
      <PostHeader avatarSrc={avatarSrc} name={name} dateString={dateString}>
        <Text fontSize={fontSize}>{content}</Text>
      </PostHeader>
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
