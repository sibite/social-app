import { Box, Center, Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { NAVBAR_TOTAL_HEIGHT } from '../../shared/navBarHeight';
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
  const { windowHeight } = useWindowDimensions();

  const style = {
    gridTemplate: '100% / auto auto',
    bgColor: useColorModeValue('white', 'gray.700'),
    '& > *': {
      maxHeight: 'inherit',
    },
    maxHeight: `${windowHeight - NAVBAR_TOTAL_HEIGHT}px`,
    my: 0,
    mx: 14,
    pointerEvents: 'auto',
  };

  const buttonWrapperStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    height: '100%',
  };

  return (
    <Overlay onClick={onClose}>
      <Center width="100%" height="100%" pointerEvents="none">
        <Grid sx={style}>{children}</Grid>
      </Center>
      <Flex sx={buttonWrapperStyle} left="0" ml={2}>
        <LeftButton side={side} clickHandler={onSlideLeft} variant="ghost" />
      </Flex>
      <Flex sx={buttonWrapperStyle} right="0" mr={2}>
        <RightButton side={side} clickHandler={onSlideRight} variant="ghost" />
      </Flex>
      <Box position="absolute" top="0" right="0" mr={2} mt={2}>
        <CloseButton clickHandler={onClose} variant="ghost" />
      </Box>
    </Overlay>
  );
};
export default PhotoViewerMDContainer;
