import Card from '../chakra-ui/Card';
import Post from '../feed/Post';

type Props = Parameters<typeof Post>[0];

const PhotoSideContent: React.FC<Props> = ({
  postId,
  avatarSrc,
  name,
  content,
  likedBy,
  dateString,
  comments,
  options,
}) => (
  <Card variant="unstyled">
    <Post
      postId={postId}
      options={options}
      avatarSrc={avatarSrc}
      name={name}
      content={content}
      dateString={dateString}
      likedBy={likedBy}
      comments={comments}
      alwaysShowComments
    />
  </Card>
);
export default PhotoSideContent;
