import {
  Center,
  DarkMode,
  Flex,
  Grid,
  IconButton,
  Portal,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useContext } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import PortalRefContext from '../../store/ref-context';
import HeroIcon from '../chakra-ui/HeroIcon';
import Overlay from '../misc/Overlay';

interface Props {
  children: React.ReactNode;
  onSlideLeft?: Function;
  onSlideRight?: Function;
  side?: -1 | 0 | 1;
  onClose?: Function;
}

const PhotoViewerContainer: React.FC<Props> = ({
  children,
  onSlideLeft,
  onSlideRight,
  onClose,
  side,
}) => {
  const portalRef = useContext(PortalRefContext);

  const arrowLeftHandler = (_event: React.MouseEvent) => {
    if (onSlideLeft) onSlideLeft();
  };

  const arrowRightHandler = (_event: React.MouseEvent) => {
    if (onSlideRight) onSlideRight();
  };

  const closeHandler = (_event: React.MouseEvent) => {
    if (onClose) onClose();
  };

  useKeyPress('ArrowLeft', arrowLeftHandler);
  useKeyPress('ArrowRight', arrowRightHandler);
  useKeyPress('Escape', closeHandler);

  const style = {
    gridTemplate: useBreakpointValue({
      base: '40% 60% / 100%',
      md: '100% / auto auto',
    }),
    bgColor: 'gray.900',
    '& > *': {
      maxHeight: 'inherit',
    },
    maxHeight: 'calc(100vh - 60px)',
    height: useBreakpointValue({ base: '100%', md: 'auto' }),
    width: useBreakpointValue({ base: '100%', md: 'auto' }),
    my: 0,
    mx: useBreakpointValue({ base: 0, md: 14 }),
    pointerEvents: 'auto',
  };

  const buttonMargin = 2;

  return (
    <Portal containerRef={portalRef}>
      <Overlay onClick={closeHandler}>
        <Center width="100%" height="100%" pointerEvents="none">
          <Grid sx={style}>{children}</Grid>
        </Center>
        <DarkMode>
          <Flex
            justify="center"
            align="center"
            position="absolute"
            top="0"
            height={useBreakpointValue({ base: '40%', md: '100%' })}
            left="0"
          >
            <IconButton
              icon={<HeroIcon as={ChevronLeftIcon} />}
              aria-label="Previous photo"
              ml={buttonMargin}
              size="md"
              colorScheme="translucent"
              variant={{ base: 'solid', md: 'ghost' }}
              onClick={arrowLeftHandler}
              disabled={(side ?? 1) <= 0}
              visibility={side !== 0 ? 'visible' : 'hidden'}
            />
          </Flex>
          <Flex
            justify="center"
            align="center"
            position="absolute"
            top="0"
            height={useBreakpointValue({ base: '40%', md: '100%' })}
            right="0"
          >
            <IconButton
              icon={<HeroIcon as={ChevronRightIcon} />}
              aria-label="Next photo"
              mr={buttonMargin}
              size="md"
              colorScheme="translucent"
              variant={{ base: 'solid', md: 'ghost' }}
              onClick={arrowRightHandler}
              disabled={(side ?? -1) >= 0}
              visibility={side !== 0 ? 'visible' : 'hidden'}
            />
          </Flex>
          <IconButton
            position="absolute"
            top="0"
            right="0"
            icon={<HeroIcon as={XIcon} />}
            aria-label="Close photo viewer"
            mt={buttonMargin}
            mr={buttonMargin}
            size="md"
            colorScheme="translucent"
            variant={{ base: 'solid', md: 'ghost' }}
            onClick={closeHandler}
          />
        </DarkMode>
      </Overlay>
    </Portal>
  );
};
export default PhotoViewerContainer;
