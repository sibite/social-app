/* eslint-disable react/jsx-props-no-spreading */
import { Image, ImageProps, useBoolean } from '@chakra-ui/react';
import { useEffect } from 'react';
import ImageFallback from './ImageFallback';

interface Props extends ImageProps {
  fillFallback?: boolean;
  padFallback?: boolean;
}

const ImageWithFallback: React.FC<Props> = ({
  src,
  fillFallback,
  padFallback,
  ...rest
}) => {
  const [isError, setIsError] = useBoolean(false);

  useEffect(() => {
    setIsError.off();
  }, [src, setIsError]);

  return (
    <Image
      src={src}
      fallback={
        <ImageFallback
          pad={padFallback}
          fill={fillFallback}
          isError={isError || !src}
          cursor={rest.cursor}
          onClick={rest.onClick}
        />
      }
      onError={setIsError.on}
      {...rest}
    />
  );
};

export default ImageWithFallback;
