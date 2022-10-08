import { Center, CircularProgress } from '@chakra-ui/react';
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
    if (error && (error as FetchBaseQueryError).status === 404 && onPrev)
      onPrev();
  }, [error, onPrev]);

  if ((isLoading || isFetching) && !currentData)
    ContentJSX = (
      <Center>
        <CircularProgress
          margin={4}
          isIndeterminate
          trackColor="gray.700"
          color="white"
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
