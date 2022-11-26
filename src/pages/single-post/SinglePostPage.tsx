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
import useIsMobile from '../../hooks/useIsMobile';
import useSetThemeColor from '../../hooks/useSetThemeColor';

const SinglePostPage: React.FC = () => {
  const { id } = useParams();

  const bgColor = useColorModeValue('gray.100', 'black');
  useSetThemeColor(bgColor, useIsMobile());

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
