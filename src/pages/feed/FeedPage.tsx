import { Container, useColorModeValue } from '@chakra-ui/react';
import Feed from '../../components/feed/Feed';
import PageContainer from '../../components/layout/PageContainer';
import PhotoViewerWrapper from '../../components/photo-viewer/wrappers/PhotoViewerWrapper';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import useIsMobile from '../../hooks/useIsMobile';
import useSetThemeColor from '../../hooks/useSetThemeColor';
import { useGetTotalFeedQuery } from '../../store/feed-api';

interface Props {}

const FeedPage: React.FC<Props> = () => {
  const feedQuery = useGetTotalFeedQuery();
  const posts = feedQuery.currentData ?? [];
  const isAuthenticated = useIsAuthenticated();

  const bg1 = useColorModeValue('gray.100', 'black');

  useSetThemeColor(bg1, useIsMobile());

  return (
    <PageContainer bg={bg1}>
      <PhotoViewerWrapper />
      <Container maxWidth="container.lg" px={0}>
        <Feed
          posts={posts}
          showPostCreator={isAuthenticated}
          isLoading={feedQuery.isLoading}
        />
      </Container>
    </PageContainer>
  );
};

export default FeedPage;
