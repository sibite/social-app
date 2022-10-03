import dayjs from 'dayjs';
import formatDate from '../../shared/formatDate';
import { useGetPostQuery } from '../../store/feed-api';
import Post from '../post/Post';

interface Props {
  postId: string;
}

const PostApiWrapper: React.FC<Props> = ({ postId }) => {
  const { data, isError, isLoading } = useGetPostQuery(postId);

  if (!data) return null;

  return (
    <Post
      postId={postId}
      dateString={formatDate(dayjs(data.date))}
      name={data.fullName}
      content={data.content}
      commentsCount={data.commentsCount ?? []}
      likedBy={data.likedBy ?? []}
      avatarSrc={data.avatarSrc}
      media={data.media}
      options={data.options}
      limitHeight
    />
  );
};
export default PostApiWrapper;
