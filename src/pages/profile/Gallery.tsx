import { Box, Image, SimpleGrid } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useState } from 'react';
import PhotoContainer from '../../components/photo-viewer/PhotoContainer';
import PhotoSideContent from '../../components/photo-viewer/PhotoSideContent';
import PhotoViewer from '../../components/photo-viewer/PhotoViewer';
import formatDate from '../../shared/formatDate';

interface Props {
  photos: string[];
}

const Gallery: React.FC<Props> = ({ photos }) => {
  const [isViewerShowed, setIsViewerShowed] = useState(false);
  const [photoSrc, setPhotoSrc] = useState('');

  const openPhotoViewer = (src: string) => {
    setIsViewerShowed(true);
    setPhotoSrc(src);
  };

  const closePhotoViewer = () => setIsViewerShowed(false);

  let key = -1;

  const ImagesJSX = photos.map((src) => {
    key += 1;
    return (
      <Box as="button">
        <Image
          src={src}
          width="100%"
          height="100%"
          borderRadius="md"
          onClick={() => openPhotoViewer(src)}
        />
      </Box>
    );
  });

  return (
    <SimpleGrid spacing={4} width="100%" columns={5} px={0}>
      {ImagesJSX}
      {isViewerShowed && (
        <PhotoViewer onClose={closePhotoViewer}>
          <PhotoContainer src={photoSrc} />
          <PhotoSideContent
            name="Mike Mew"
            dateString={formatDate(dayjs().subtract(5, 'minutes'))}
            comments={[
              {
                name: 'Mateusz Karbowy',
                content: 'I wish I was there',
                date: dayjs().subtract(5, 'hour'),
              },
              {
                name: 'Chris Heria',
                content: 'Perfect place to work out',
                date: dayjs().subtract(20, 'hour'),
              },
            ]}
          >
            Nice vibe
          </PhotoSideContent>
        </PhotoViewer>
      )}
    </SimpleGrid>
  );
};
export default Gallery;
