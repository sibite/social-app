import { useGetPostQuery } from '../../store/feed-api';
import Card from '../chakra-ui/Card';
import PostApiWrapper from './PostApiWrapper';
import PostSkeleton from './PostSkeleton';

interface Props {
  postId: string;
}

const FeedPost: React.FC<Props> = ({ postId }) => {
  const { isLoading } = useGetPostQuery(postId);

  if (isLoading) return <PostSkeleton />;

  return (
    <Card width="100%" overflow="hidden" key={postId}>
      <PostApiWrapper postId={postId} />
    </Card>
  );
};
export default FeedPost;
