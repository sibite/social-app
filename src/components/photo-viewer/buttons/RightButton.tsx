import { IconButton } from '@chakra-ui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import PhotoViewerButton from './PhotoViewerButton';

interface Props {
  clickHandler: React.MouseEventHandler;
  side?: -1 | 0 | 1;
  variant?: React.ComponentProps<typeof IconButton>['variant'];
}

const RightButton: React.FC<Props> = ({
  clickHandler,
  side,
  variant = 'solid',
}) => (
  <PhotoViewerButton
    heroicon={ChevronRightIcon}
    aria-label="Next photo"
    onClick={clickHandler}
    variant={variant}
    isVisible={side !== 0}
    disabled={(side ?? -1) >= 0}
  />
);
export default RightButton;
