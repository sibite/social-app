import { Box, Center, Image } from '@chakra-ui/react';

interface Props {
  src: string;
}

const PhotoContainer: React.FC<Props> = ({ src }) => (
  <Image
    src={src}
    key={src}
    minWidth={{ md: '360px' }}
    bgColor="gray.900"
    boxSize="100%"
    objectFit="contain"
  />
);
export default PhotoContainer;
