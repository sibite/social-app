import { Box, Center, Image } from '@chakra-ui/react';

interface Props {
  src: string;
}

const PhotoContainer: React.FC<Props> = ({ src }) => (
  <Box minWidth={{ md: '360px' }} maxHeight="100%">
    <Image src={src} boxSize="100%" objectFit="contain" />
  </Box>
);
export default PhotoContainer;
