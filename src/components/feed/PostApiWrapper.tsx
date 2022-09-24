import dayjs from 'dayjs';
import formatDate from '../../shared/formatDate';
import { useGetPostQuery } from '../../store/feed-api';
import Post from './Post';

interface Props {
  postId: string;
}

const PostApiWrapper: React.FC<Props> = ({ postId }) => {
  const { data, isError, isLoading } = useGetPostQuery(postId);

  if (!data) return null;

  return (
    <Post
      dateString={formatDate(dayjs(data.date))}
      name={data.fullName}
      content={data.content}
      comments={data.comments ?? []}
      likes={(data.likedBy ?? []).length}
      avatarSrc={data.avatarSrc}
      media={data.media}
    />
  );
};
export default PostApiWrapper;
