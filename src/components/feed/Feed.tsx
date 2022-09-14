import { Container, VStack } from '@chakra-ui/react';
import formatDate from '../../shared/formatDate';
import { Post } from '../../store/profile';
import FeedCard from './FeedCard';

interface Props {
  posts: Post[];
}

const Feed: React.FC<Props> = ({ posts }) => {
  let key = -1;
  const PostsJSX = posts.map((post) => {
    key += 1;

    return (
      <FeedCard
        key={key}
        dateString={formatDate(post.date)}
        name={post.name}
        comments={post.comments}
        likes={post.likes}
        avatarSrc={post.avatarSrc}
        photoSrc={post.photoSrc}
      >
        {post.content}
      </FeedCard>
    );
  });

  return (
    <Container maxWidth="xl">
      <VStack spacing={10}>{PostsJSX}</VStack>
    </Container>
  );
};

export default Feed;
