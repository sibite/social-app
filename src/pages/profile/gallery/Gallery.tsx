import {
  AspectRatio,
  Badge,
  Center,
  Grid,
  Heading,
  Skeleton,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useSearchParams } from 'react-router-dom';
import { useGetProfileMediaQuery } from '../../../store/feed-api';
import { useGetProfileQuery } from '../../../store/profile-api';
import GalleryItem from './GalleryItem';

interface Props {
  profileId: string;
}

const Gallery: React.FC<Props> = ({ profileId }) => {
  const setSearchParams = useSearchParams()[1];
  const { currentData: profile } = useGetProfileQuery(profileId);
  const { currentData, isFetching } = useGetProfileMediaQuery(profileId);

  const media = currentData ?? [];

  const openMediaHandler = (mediaId: string) => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      profileId,
      mediaId,
    }));
  };

  const ImagesJSX = media.map((_id) => (
    <GalleryItem mediaId={_id} key={_id} onOpen={openMediaHandler} />
  ));

  const minSize = useBreakpointValue({ base: 90, sm: 120, md: 150 });

  return (
    <VStack spacing={8} py={12} px={4}>
      <Heading as="h2" size="lg" alignSelf="flex-start">
        {profile && `${profile?.name}'s photos`}
        <Badge ml={3} fontSize="lg" colorScheme="blue">
          {media.length}
        </Badge>
      </Heading>
      <Center flexDirection="column" width="100%">
        <Grid
          templateColumns={`repeat(auto-fit, minmax(${minSize}px, 1fr))`}
          width="100%"
          justifyContent="center"
          gap={{ base: 2, md: 4 }}
        >
          {!isFetching && ImagesJSX}
          {isFetching &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <AspectRatio key={n} ratio={1}>
                <Skeleton borderRadius="lg" />
              </AspectRatio>
            ))}
        </Grid>
      </Center>
    </VStack>
  );
};
export default Gallery;
