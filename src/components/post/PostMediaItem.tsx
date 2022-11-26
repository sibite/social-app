import { AspectRatio, Box, Image, useBoolean } from '@chakra-ui/react';
import ImageFallback from '../misc/ImageFallback';
import ImageWithFallback from '../misc/ImageWithFallback';

interface Props {
  mediaId: string;
  src?: string;
  ratio?: number;
  leftItemsCount?: number;
  onClick?: (mediaId: string) => any;
}

const PostMediaItem: React.FC<Props> = ({
  mediaId,
  src,
  ratio,
  leftItemsCount,
  onClick,
}) => {
  const clickHandler = () => {
    if (onClick) onClick(mediaId);
  };

  const ImageJSX = (
    <>
      <ImageWithFallback
        key={src}
        src={src}
        padFallback
        boxSize="100%"
        maxHeight="600px"
        objectFit="contain"
        cursor="pointer"
        onClick={clickHandler}
      />
      {leftItemsCount ? (
        <Box
          gridArea="2 / 3 / 3 / 4"
          bgColor="rgba(0, 0, 0, 0.5)"
          fontSize="2em"
          boxSize="100%"
          overflow="hidden"
          color="white"
          fontWeight="bold"
          pointerEvents="none"
        >{`+${leftItemsCount}`}</Box>
      ) : null}
    </>
  );

  return ratio ? (
    <AspectRatio ratio={ratio} position="relative">
      {ImageJSX}
    </AspectRatio>
  ) : (
    ImageJSX
  );
};
export default PostMediaItem;
