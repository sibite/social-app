import { useGetPostQuery } from '../../store/feed-api';
import AppCard from '../chakra-ui/AppCard';
import PostApiWrapper from './PostApiWrapper';
import PostError from './PostError';
import PostSkeleton from './PostSkeleton';

interface Props {
  postId: string;
}

const FeedPost: React.FC<Props> = ({ postId }) => {
  const { isLoading, isError } = useGetPostQuery(postId);

  if (isLoading) return <PostSkeleton />;

  if (isError) return <PostError postId={postId} />;

  return (
    <AppCard width="100%" key={postId}>
      <PostApiWrapper postId={postId} />
    </AppCard>
  );
};
export default FeedPost;
