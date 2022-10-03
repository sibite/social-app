import { IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import PhotoViewerButton from './PhotoViewerButton';

interface Props {
  clickHandler: React.MouseEventHandler;
  side?: -1 | 0 | 1;
  variant?: React.ComponentProps<typeof IconButton>['variant'];
}

const LeftButton: React.FC<Props> = ({
  clickHandler,
  side,
  variant = 'solid',
}) => (
  <PhotoViewerButton
    heroicon={ChevronLeftIcon}
    aria-label="Previous photo"
    onClick={clickHandler}
    variant={variant}
    isVisible={side !== 0}
    disabled={(side ?? 1) <= 0}
  />
);
export default LeftButton;
