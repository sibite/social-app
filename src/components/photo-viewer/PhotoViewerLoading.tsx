import { Center, CircularProgress, useColorModeValue } from '@chakra-ui/react';

const PhotoViewerLoading: React.FC = () => {
  const spinnerColor = useColorModeValue('gray.700', 'gray.200');
  const trackColor = useColorModeValue('gray.300', 'gray.600');
  return (
    <Center height="100%">
      <CircularProgress
        margin={4}
        isIndeterminate
        color={spinnerColor}
        trackColor={trackColor}
      />
    </Center>
  );
};
export default PhotoViewerLoading;
