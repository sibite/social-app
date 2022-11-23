import { useBreakpointValue } from '@chakra-ui/react';
import AppCard from '../chakra-ui/AppCard';
import Post from '../post/Post';

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
  <AppCard
    variant="unstyled"
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
  </AppCard>
);
export default PhotoSideContent;
