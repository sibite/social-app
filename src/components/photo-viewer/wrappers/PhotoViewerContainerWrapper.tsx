import { Portal } from '@chakra-ui/react';
import { useContext } from 'react';
import useKeyPress from '../../../hooks/useKeyPress';
import useBreakpointValue from '../../../hooks/wrappers/useBreakpointValue';
import PortalRefContext from '../../../store/ref-context';
import PhotoViewerMDContainer from '../PhotoViewerMDContainer';
import PhotoViewerXSContainer from '../PhotoViewerXSContainer';

interface Props {
  children: React.ReactNode;
  onSlideLeft: Function;
  onSlideRight: Function;
  side?: -1 | 0 | 1;
  onClose: Function;
}

const PhotoViewerContainerWrapper: React.FC<Props> = ({
  children,
  onSlideLeft,
  onSlideRight,
  onClose,
  side,
}) => {
  const portalRef = useContext(PortalRefContext);

  useKeyPress('ArrowLeft', onSlideLeft);
  useKeyPress('ArrowRight', onSlideRight);
  useKeyPress('Escape', onClose);

  const MatchingContainer =
    useBreakpointValue({
      base: PhotoViewerXSContainer,
      md: PhotoViewerMDContainer,
    }) ?? PhotoViewerMDContainer;

  return (
    <Portal containerRef={portalRef}>
      <MatchingContainer
        onSlideLeft={() => onSlideLeft()}
        onSlideRight={() => onSlideRight()}
        onClose={() => onClose()}
        side={side}
      >
        {children}
      </MatchingContainer>
    </Portal>
  );
};
export default PhotoViewerContainerWrapper;
