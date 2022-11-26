import ImageWithFallback from '../misc/ImageWithFallback';

interface Props {
  src: string;
}

const PhotoContainer: React.FC<Props> = ({ src }) => (
  <ImageWithFallback
    src={src}
    key={src}
    fillFallback
    padFallback
    minWidth={{ md: '360px' }}
    bgColor="gray.900"
    boxSize="100%"
    objectFit="contain"
  />
);
export default PhotoContainer;
