import { Center, CircularProgress, useColorModeValue } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import formatDateRelative from '../../shared/formatDateRelative';
import { useGetPostQuery } from '../../store/feed-api';
import PhotoContainer from './PhotoContainer';
import PhotoSideContent from './PhotoSideContent';
import PhotoViewerContainerWrapper from './PhotoViewerContainerWrapper';

interface Props {
  mediaId: string;
  onPrev?: Function;
  onNext?: Function;
  onClose?: Function;
  side?: -1 | 0 | 1;
}

const PhotoViewerAPIWrapper: React.FC<Props> = ({
  mediaId,
  onPrev,
  onNext,
  onClose,
  side,
}) => {
  const closePhotoViewer = () => {
    if (onClose) onClose();
  };

  const slideLeftHandler = () => {
    if (onPrev) onPrev();
  };

  const slideRightHandler = () => {
    if (onNext) onNext();
  };

  const {
    data: mediaPost,
    isLoading,
    isFetching,
    error,
    currentData,
  } = useGetPostQuery(mediaId);

  let ContentJSX;

  useEffect(() => {
    if (error && (error as FetchBaseQueryError).status === 404)
      if (side === 0 && onClose) onClose();
      else if (side === -1 && onNext) onNext();
      else if (onPrev) onPrev();
  }, [error, onPrev, onNext, onClose, side]);

  const spinnerColor = useColorModeValue('gray.700', 'gray.200');
  const trackColor = useColorModeValue('gray.300', 'gray.600');

  if ((isLoading || isFetching) && !currentData)
    ContentJSX = (
      <Center height="100%">
        <CircularProgress
          margin={4}
          isIndeterminate
          color={spinnerColor}
          trackColor={trackColor}
        />
      </Center>
    );
  else if (mediaPost) {
    const {
      media,
      fullName,
      avatarSrc,
      content,
      date,
      likedBy,
      options,
      commentsCount,
    } = mediaPost;

    ContentJSX = (
      <>
        <PhotoContainer src={media[0].src!} />
        <PhotoSideContent
          postId={mediaId}
          avatarSrc={avatarSrc}
          options={options}
          name={fullName}
          content={content}
          dateString={formatDateRelative(dayjs(date))}
          likedBy={likedBy ?? []}
          commentsCount={commentsCount}
        />
      </>
    );
  } else ContentJSX = null;

  return (
    <PhotoViewerContainerWrapper
      onClose={closePhotoViewer}
      onSlideLeft={slideLeftHandler}
      onSlideRight={slideRightHandler}
      side={side}
    >
      {ContentJSX}
    </PhotoViewerContainerWrapper>
  );
};
export default PhotoViewerAPIWrapper;
