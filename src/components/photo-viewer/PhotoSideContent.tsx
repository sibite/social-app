import { Comment } from '../../store/profile';
import Card from '../chakra-ui/Card';
import Post from '../feed/Post';

interface Props {
  avatarSrc?: string;
  name: string;
  dateString: string;
  comments: Comment[];
  children?: React.ReactNode;
}

const PhotoSideContent: React.FC<Props> = ({
  avatarSrc,
  name,
  dateString,
  comments,
  children,
}) => (
  <Card variant="unstyled">
    <Post
      avatarSrc={avatarSrc}
      name={name}
      dateString={dateString}
      likes={3}
      comments={comments}
      alwaysShowComments
    >
      {children}
    </Post>
  </Card>
);
export default PhotoSideContent;
