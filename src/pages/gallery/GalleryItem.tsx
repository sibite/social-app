import {
  AspectRatio,
  Box,
  Center,
  Image,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { useGetPostQuery } from '../../store/feed-api';

interface Props {
  mediaId: string;
  onOpen: (mediaId: string) => any;
}

const GalleryItem: React.FC<Props> = ({ mediaId, onOpen }) => {
  const { data: mediaPost, isLoading } = useGetPostQuery(mediaId);

  const clickHandler = () => {
    onOpen(mediaId);
  };

  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <AspectRatio ratio={1} boxSize="100%" onClick={clickHandler}>
      <Box as="button" borderRadius="lg" bgColor={bgColor} overflow="hidden">
        {isLoading && (
          <Center boxSize="100%">
            <Spinner />
          </Center>
        )}
        {mediaPost && (
          <Image
            src={mediaPost?.mediaSrc}
            borderRadius="md"
            boxSize="100%"
            objectFit="cover"
          />
        )}
      </Box>
    </AspectRatio>
  );
};
export default GalleryItem;
