import { Container, VStack } from '@chakra-ui/react';
import Card from '../chakra-ui/Card';
import NewPost from './NewPost';
import PostApiWrapper from './PostApiWrapper';

interface Props {
  posts: string[];
}

const Feed: React.FC<Props> = ({ posts }) => {
  const PostsJSX = posts.map((postId) => (
    <Card width="100%" overflow="hidden" key={postId}>
      <PostApiWrapper postId={postId} />
    </Card>
  ));

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
