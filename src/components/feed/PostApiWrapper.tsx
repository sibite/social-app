import formatDateRelative from '../../shared/formatDateRelative';
import getDayjsInstance from '../../shared/getDayjsInstance';
import { useGetPostQuery } from '../../store/feed-api';
import Post from '../post/Post';

const dayjs = getDayjsInstance();

interface Props {
  postId: string;
}

const PostApiWrapper: React.FC<Props> = ({ postId }) => {
  const { data } = useGetPostQuery(postId);

  if (!data) return null;

  return (
    <Post
      postId={postId}
      creatorId={data.creatorId}
      dateString={formatDateRelative(dayjs(data.date))}
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
