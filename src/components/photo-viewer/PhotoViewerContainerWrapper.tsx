import { Portal, useBreakpointValue } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import useKeyPress from '../../hooks/useKeyPress';
import PortalRefContext from '../../store/ref-context';
import PhotoViewerMDContainer from './PhotoViewerMDContainer';
import PhotoViewerXSContainer from './PhotoViewerXSContainer';

interface Props {
  children: React.ReactNode;
  onSlideLeft?: Function;
  onSlideRight?: Function;
  side?: -1 | 0 | 1;
  onClose?: Function;
}

const PhotoViewerContainerWrapper: React.FC<Props> = ({
  children,
  onSlideLeft,
  onSlideRight,
  onClose,
  side,
}) => {
  const portalRef = useContext(PortalRefContext);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.removeProperty('overflow');
    };
  });

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

  const MatchingContainer =
    useBreakpointValue({
      base: PhotoViewerXSContainer,
      md: PhotoViewerMDContainer,
    }) ?? PhotoViewerMDContainer;

  return (
    <Portal containerRef={portalRef}>
      <MatchingContainer
        onSlideLeft={arrowLeftHandler}
        onSlideRight={arrowRightHandler}
        onClose={closeHandler}
        side={side}
      >
        {children}
      </MatchingContainer>
    </Portal>
  );
};
export default PhotoViewerContainerWrapper;
