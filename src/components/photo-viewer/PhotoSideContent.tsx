import { useBreakpointValue } from '@chakra-ui/react';
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
  commentsCount,
  options,
}) => (
  <Card
    variant="unstyled"
    height="100%"
    minWidth="180px"
    maxWidth={useBreakpointValue({ base: 'none', md: '420px' })}
  >
    <Post
      postId={postId}
      options={options}
      avatarSrc={avatarSrc}
      name={name}
      content={content}
      dateString={dateString}
      likedBy={likedBy}
      commentsCount={commentsCount}
      limitHeight={useBreakpointValue({ base: false, md: true })}
      alwaysShowComments
    />
  </Card>
);
export default PhotoSideContent;
