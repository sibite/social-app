import { Center, CircularProgress } from '@chakra-ui/react';
import dayjs from 'dayjs';
import formatDate from '../../shared/formatDate';
import { useGetPostQuery } from '../../store/feed-api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeMediaGroup, setIndex } from '../../store/photo-viewer';
import PhotoContainer from './PhotoContainer';
import PhotoSideContent from './PhotoSideContent';
import PhotoViewerContainer from './PhotoViewerContainer';

interface Props {
  mediaIds: string[];
}

const PhotoViewerAPIWrapper: React.FC<Props> = ({ mediaIds }) => {
  const dispatch = useAppDispatch();
  const index = useAppSelector((state) => state.photoViewer.index);
  const currentIndex = Math.max(0, Math.min(index, mediaIds.length - 1 ?? 0));
  const side = ((i) => {
    if (mediaIds.length <= 1) return 0;
    if (i === 0) return -1;
    if (i === mediaIds.length - 1) return 1;
    return undefined;
  })(currentIndex);

  const closePhotoViewer = () => {
    dispatch(closeMediaGroup());
  };

  const slideLeftHandler = () => {
    dispatch(setIndex(currentIndex - 1));
  };

  const slideRightHandler = () => {
    dispatch(setIndex(currentIndex + 1));
  };

  const mediaId = mediaIds[currentIndex];

  const {
    data: mediaPost,
    isLoading,
    isFetching,
    currentData,
  } = useGetPostQuery(mediaId);

  let ContentJSX;

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
          dateString={formatDate(dayjs(date).subtract(5, 'minutes'))}
          likedBy={likedBy ?? []}
          commentsCount={commentsCount}
        />
      </>
    );
  } else ContentJSX = null;

  return (
    <PhotoViewerContainer
      onClose={closePhotoViewer}
      onSlideLeft={slideLeftHandler}
      onSlideRight={slideRightHandler}
      side={side}
    >
      {ContentJSX}
    </PhotoViewerContainer>
  );
};
export default PhotoViewerAPIWrapper;
