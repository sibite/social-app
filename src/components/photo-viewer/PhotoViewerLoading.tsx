import { Center, Spinner, useColorModeValue } from '@chakra-ui/react';

const PhotoViewerLoading: React.FC = () => {
  const spinnerColor = useColorModeValue('gray.700', 'gray.200');
  return (
    <Center height="100%">
      <Spinner margin={6} size="xl" color={spinnerColor} borderWidth={3} />
    </Center>
  );
};
export default PhotoViewerLoading;
