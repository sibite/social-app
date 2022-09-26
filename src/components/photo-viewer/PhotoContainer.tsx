import { Box, Center, Image } from '@chakra-ui/react';

interface Props {
  src: string;
}

const PhotoContainer: React.FC<Props> = ({ src }) => (
  <Image
    src={src}
    minWidth={{ md: '360px' }}
    boxSize="100%"
    objectFit="contain"
  />
);
export default PhotoContainer;
