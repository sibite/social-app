import { Container, useColorModeValue } from '@chakra-ui/react';
import Feed from '../../components/feed/Feed';
import PageContainer from '../../components/layout/PageContainer';
import PhotoViewerWrapper from '../../components/photo-viewer/wrappers/PhotoViewerWrapper';
import { useGetTotalFeedQuery } from '../../store/feed-api';

interface Props {}

const FeedPage: React.FC<Props> = () => {
  const feedQuery = useGetTotalFeedQuery();

  const posts = feedQuery.currentData ?? [];

  const bg1 = useColorModeValue('gray.100', 'black');

  return (
    <PageContainer bg={bg1}>
      <PhotoViewerWrapper />
      <Container maxWidth="container.lg" px={0}>
        <Feed posts={posts} />
      </Container>
    </PageContainer>
  );
};

export default FeedPage;
