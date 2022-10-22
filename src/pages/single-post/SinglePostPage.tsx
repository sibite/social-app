import {
  Center,
  Container,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import FeedPost from '../../components/feed/FeedPost';
import PageContainer from '../../components/layout/PageContainer';
import PhotoViewerWrapper from '../../components/photo-viewer/wrappers/PhotoViewerWrapper';

const SinglePostPage: React.FC = () => {
  const { id } = useParams();

  const bgColor = useColorModeValue('gray.100', 'black');

  if (!id) return <Heading color="blue">404</Heading>;

  return (
    <PageContainer bgColor={bgColor}>
      <PhotoViewerWrapper />
      <Container maxWidth="container.md" py={10}>
        <Center>
          <FeedPost postId={id} />
        </Center>
      </Container>
    </PageContainer>
  );
};
export default SinglePostPage;
