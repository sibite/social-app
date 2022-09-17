import { Box, Center, Image } from '@chakra-ui/react';

interface Props {
  src: string;
}

const PhotoContainer: React.FC<Props> = ({ src }) => (
  <Center>
    <Box minWidth={{ md: '360px' }}>
      <Image src={src} boxSize="100%" objectFit="contain" />
    </Box>
  </Center>
);
export default PhotoContainer;
