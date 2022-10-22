import { useSearchParams } from 'react-router-dom';
import PhotoViewerAPIWrapper from './PhotoViewerAPIWrapper';

const getAdjustedIndex = (arr: any[], index: number) =>
  Math.max(0, Math.min(arr.length - 1, index));

const PhotoViewerMediaListWrapper: React.FC<{
  mediaList: string[];
  mediaId: string;
}> = ({ mediaList, mediaId }) => {
  const setSearchParams = useSearchParams()[1];

  const currentIndex = mediaId ? mediaList.indexOf(mediaId) : null;

  const side = ((i) => {
    if (mediaList.length <= 1) return 0;
    if (i === 0) return -1;
    if (i === mediaList.length - 1) return 1;
    return undefined;
  })(currentIndex);

  const prevHandler = () => {
    const newIndex =
      currentIndex !== null ? getAdjustedIndex(mediaList, currentIndex - 1) : 0;
    setSearchParams((prevSP) => {
      prevSP.set('mediaId', mediaList[newIndex]);
      return prevSP;
    });
  };

  const nextHandler = () => {
    const newIndex =
      currentIndex !== null
        ? getAdjustedIndex(mediaList, currentIndex + 1)
        : mediaList.length - 1;
    setSearchParams((prevSP) => {
      prevSP.set('mediaId', mediaList[newIndex]);
      return prevSP;
    });
  };

  const closeHandler = () => {
    setSearchParams((prevSP) => {
      prevSP.delete('mediaId');
      prevSP.delete('postId');
      return prevSP;
    });
  };

  return (
    <PhotoViewerAPIWrapper
      mediaId={mediaId}
      onPrev={prevHandler}
      onNext={nextHandler}
      onClose={closeHandler}
      side={side}
    />
  );
};
export default PhotoViewerMediaListWrapper;
