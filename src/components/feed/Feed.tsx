import { Container, VStack } from '@chakra-ui/react';
import formatDate from '../../shared/formatDate';
import { Post as PostType } from '../../store/profile';
import Card from '../chakra-ui/Card';
import Post from './Post';

interface Props {
  posts: PostType[];
}

const Feed: React.FC<Props> = ({ posts }) => {
  let key = -1;
  const PostsJSX = posts.map((post) => {
    key += 1;

    return (
      <Card>
        <Post
          key={key}
          dateString={formatDate(post.date)}
          name={post.name}
          comments={post.comments}
          likes={post.likes}
          avatarSrc={post.avatarSrc}
          photoSrc={post.photoSrc}
        >
          {post.content}
        </Post>
      </Card>
    );
  });

  return (
    <Container maxWidth="xl">
      <VStack spacing={10}>{PostsJSX}</VStack>
    </Container>
  );
};

export default Feed;
