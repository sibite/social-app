import { useEffect } from 'react';

interface Prop {
  isError: boolean;
  side?: -1 | 0 | 1;
  onPrev: Function;
  onNext: Function;
  onClose: Function;
}

const usePhotoViewerFallback = ({
  isError,
  side,
  onPrev,
  onNext,
  onClose,
}: Prop) => {
  useEffect(() => {
    if (isError)
      if (side === 0 && onClose) onClose();
      else if (side === -1 && onNext) onNext();
      else if (onPrev) onPrev();
  }, [isError, onPrev, onNext, onClose, side]);
};

export default usePhotoViewerFallback;
