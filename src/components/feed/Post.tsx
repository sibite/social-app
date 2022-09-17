import { Badge, Button, Grid, Image } from '@chakra-ui/react';
import { AnnotationIcon, HeartIcon, ShareIcon } from '@heroicons/react/outline';
import { Comment } from '../../store/profile';
import HeroIcon from '../chakra-ui/HeroIcon';
import CommentsSection from './CommentsSection';
import PostHeader from './PostHeader';

interface Props {
  avatarSrc?: string;
  photoSrc?: string;
  name: string;
  dateString: string;
  likes: number;
  comments: Comment[];
  alwaysShowComments?: boolean;
  children?: React.ReactNode;
}

const Post: React.FC<Props> = ({
  avatarSrc,
  photoSrc,
  name,
  dateString,
  likes,
  comments,
  alwaysShowComments = false,
  children,
}) => (
  <>
    <PostHeader avatarSrc={avatarSrc} name={name} dateString={dateString}>
      {children}
    </PostHeader>
    {photoSrc && <Image src={photoSrc} />}
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
    <CommentsSection comments={comments} />
  </>
);

export default Post;
