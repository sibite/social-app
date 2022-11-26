import { useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import AppCard from '../chakra-ui/AppCard';
import Post from '../post/Post';

type Props = Parameters<typeof Post>[0];

const PhotoSideContent: React.FC<Props> = ({
  postId,
  creatorId,
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
    bgColor={useColorModeValue('white', 'gray.900')}
    maxWidth={useBreakpointValue({ base: 'none', md: '420px' })}
  >
    <Post
      postId={postId}
      creatorId={creatorId}
      options={options}
      avatarSrc={avatarSrc}
      name={name}
      content={content}
      dateString={dateString}
      likedBy={likedBy}
      commentsCount={commentsCount}
      limitHeight={useBreakpointValue({ base: false, md: true })}
      alwaysShowComments
      commentColor={useColorModeValue('gray.100', 'gray.800')}
    />
  </AppCard>
);
export default PhotoSideContent;
