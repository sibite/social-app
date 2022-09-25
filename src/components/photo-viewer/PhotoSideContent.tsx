import { Comment } from '../../store/profile';
import Card from '../chakra-ui/Card';
import Post from '../feed/Post';

interface Props {
  avatarSrc?: string;
  name: string;
  content?: string;
  dateString: string;
  comments: Comment[];
  children?: React.ReactNode;
}

const PhotoSideContent: React.FC<Props> = ({
  avatarSrc,
  name,
  content,
  dateString,
  comments,
}) => (
  <Card variant="unstyled">
    <Post
      postId="unknown"
      options={{}}
      avatarSrc={avatarSrc}
      name={name}
      content={content}
      dateString={dateString}
      likedBy={['sd', 'dsa', 'dsaa']}
      comments={comments}
      alwaysShowComments
    />
  </Card>
);
export default PhotoSideContent;
