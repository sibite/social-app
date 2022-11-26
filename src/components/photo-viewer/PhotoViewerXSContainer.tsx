import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import useSetThemeColor from '../../hooks/useSetThemeColor';
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

const PhotoViewerXSContainer: React.FC<Props> = ({
  children,
  onSlideLeft,
  onSlideRight,
  onClose,
  side,
}) => {
  const { windowHeight } = useWindowDimensions();

  const photoHeight = '420px';
  const bgColor = useColorModeValue('white', 'gray.900');
  useSetThemeColor(bgColor);

  const style = {
    flexDirection: 'column',
    bgColor,
    height: `${windowHeight - NAVBAR_TOTAL_HEIGHT}px`,
    width: '100%',
    overflowY: 'auto',
    pointerEvents: 'auto',
    overscrollBehavior: 'auto',
    position: 'relative',
    '& > img, & .fallback': {
      minHeight: photoHeight,
      maxHeight: photoHeight,
    },
  };

  const buttonWrapperStyle = {
    alignItems: 'center',
    height: photoHeight,
    position: 'absolute',
    top: '0',
  };

  return (
    <Overlay onClick={onClose}>
      <Flex sx={style}>
        {children}
        <Flex sx={buttonWrapperStyle} left="0" ml={2}>
          <LeftButton side={side} clickHandler={onSlideLeft} />
        </Flex>
        <Flex sx={buttonWrapperStyle} right="0" mr={2}>
          <RightButton side={side} clickHandler={onSlideRight} />
        </Flex>
      </Flex>
      <Box position="absolute" top={2} right={2}>
        <CloseButton clickHandler={onClose} />
      </Box>
    </Overlay>
  );
};
export default PhotoViewerXSContainer;
