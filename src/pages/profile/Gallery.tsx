import { Box, Image, SimpleGrid } from '@chakra-ui/react';

interface Props {
  photos: string[];
}

const Gallery: React.FC<Props> = ({ photos }) => {
  let key = -1;

  const ImagesJSX = photos.map((src) => {
    key += 1;
    return (
      <Box as="button">
        <Image src={src} width="100%" height="100%" borderRadius="md" />
      </Box>
    );
  });

  return (
    <SimpleGrid spacing={4} width="100%" columns={5} px={0} py={10}>
      {ImagesJSX}
    </SimpleGrid>
  );
};
export default Gallery;
