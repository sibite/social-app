import { Box, Flex, LightMode, useColorModeValue } from '@chakra-ui/react';
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

const PhotoViewerXSContainer: React.FC<Props> = ({
  children,
  onSlideLeft,
  onSlideRight,
  onClose,
  side,
}) => {
  const { windowHeight } = useWindowDimensions();

  const photoHeight = '300px';

  const style = {
    flexDirection: 'column',
    bgColor: useColorModeValue('white', 'gray.800'),
    height: `${windowHeight - NAVBAR_TOTAL_HEIGHT}px`,
    width: '100%',
    overflowY: 'auto',
    pointerEvents: 'auto',
    overscrollBehavior: 'auto',
    position: 'relative',
    '& > img': {
      minHeight: photoHeight,
      maxHeight: photoHeight,
    },
  };

  return (
    <Overlay onClick={onClose}>
      <Flex sx={style}>
        {children}
        <Flex
          alignItems="center"
          height={photoHeight}
          position="absolute"
          top="0"
          left="0"
          ml={2}
        >
          <LeftButton side={side} clickHandler={onSlideLeft} />
        </Flex>
        <Flex
          alignItems="center"
          height={photoHeight}
          position="absolute"
          top="0"
          right="0"
          mr={2}
        >
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
