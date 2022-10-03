import { Container, VStack } from '@chakra-ui/react';
import FeedPost from './FeedPost';
import NewPost from './NewPost';
import PostSkeleton from './PostSkeleton';

interface Props {
  posts: string[];
  isLoading?: boolean;
}

const Feed: React.FC<Props> = ({ posts, isLoading = false }) => {
  const PostsJSX = (() => {
    if (isLoading)
      return (
        <>
          <PostSkeleton />
          <PostSkeleton />
        </>
      );

    return posts.map((postId) => <FeedPost key={postId} postId={postId} />);
  })();

  return (
    <Container maxWidth="xl" py={10} px={0}>
      <VStack spacing={10}>
        <NewPost />
        {PostsJSX}
      </VStack>
    </Container>
  );
};

export default Feed;
