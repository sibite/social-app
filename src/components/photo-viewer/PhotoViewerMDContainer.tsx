import { Box, Center, Flex, Grid, LightMode } from '@chakra-ui/react';
import React from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Overlay from '../misc/Overlay';
import CloseButton from './buttons/CloseButton';
import LeftButton from './buttons/LeftButton';
import RightButton from './buttons/RightButton';

interface Props {
  children: React.ReactNode;
  onSlideLeft: React.MouseEventHandler;
  onSlideRight: React.MouseEventHandler;
  side?: -1 | 0 | 1;
  onClose: React.MouseEventHandler;
}

const PhotoViewerMDContainer: React.FC<Props> = ({
  children,
  onSlideLeft,
  onSlideRight,
  onClose,
  side,
}) => {
  const { windowHeight, windowWidth } = useWindowDimensions();

  const style = {
    gridTemplate: '100% / auto auto',
    bgColor: 'gray.900',
    '& > *': {
      maxHeight: 'inherit',
    },
    maxHeight: `${windowHeight - 61}px`,
    my: 0,
    mx: 14,
    pointerEvents: 'auto',
  };

  return (
    <Overlay onClick={onClose}>
      <Center width="100%" height="100%" pointerEvents="none">
        <Grid sx={style}>{children}</Grid>
      </Center>
      <LightMode>
        <Flex
          justify="center"
          align="center"
          position="absolute"
          top="0"
          height="100%"
          left="0"
          mr={2}
        >
          <LeftButton side={side} clickHandler={onSlideLeft} variant="ghost" />
        </Flex>
        <Flex
          justify="center"
          align="center"
          position="absolute"
          top="0"
          height="100%"
          right="0"
          mr={2}
        >
          <RightButton
            side={side}
            clickHandler={onSlideRight}
            variant="ghost"
          />
        </Flex>
        <Box position="absolute" top="0" right="0" mr={2} mt={2}>
          <CloseButton clickHandler={onClose} variant="ghost" />
        </Box>
      </LightMode>
    </Overlay>
  );
};
export default PhotoViewerMDContainer;