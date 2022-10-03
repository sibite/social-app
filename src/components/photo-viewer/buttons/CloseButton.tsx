import { IconButton } from '@chakra-ui/react';
import { XIcon } from '@heroicons/react/outline';
import PhotoViewerButton from './PhotoViewerButton';

interface Props {
  clickHandler: React.MouseEventHandler;
  variant?: React.ComponentProps<typeof IconButton>['variant'];
}

const CloseButton: React.FC<Props> = ({ clickHandler, variant = 'solid' }) => (
  <PhotoViewerButton
    heroicon={XIcon}
    aria-label="Close photo"
    onClick={clickHandler}
    variant={variant}
    isVisible
  />
);
export default CloseButton;
