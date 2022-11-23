import { Container, VStack } from '@chakra-ui/react';
import FeedPost from './FeedPost';
import NewPost from '../new-post/NewPost';
import PostSkeleton from './PostSkeleton';

interface Props {
  posts: string[];
  showPostCreator?: boolean;
  isLoading?: boolean;
}

const Feed: React.FC<Props> = ({
  posts,
  showPostCreator = true,
  isLoading = false,
}) => {
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
    <Container maxWidth="xl" py={10} px={3}>
      <VStack spacing={10}>
        {showPostCreator && <NewPost />}
        {PostsJSX}
      </VStack>
    </Container>
  );
};

export default Feed;
