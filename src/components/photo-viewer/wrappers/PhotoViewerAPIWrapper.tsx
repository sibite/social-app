import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import formatDateRelative from '../../../shared/formatDateRelative';
import { useGetPostQuery } from '../../../store/feed-api';
import PhotoContainer from '../PhotoContainer';
import PhotoSideContent from '../PhotoSideContent';
import PhotoViewerContainerWrapper from './PhotoViewerContainerWrapper';
import PhotoViewerLoading from '../PhotoViewerLoading';
import usePhotoViewerFallback from '../usePhotoViewerFallback';
import getDayjsInstance from '../../../shared/getDayjsInstance';

const dayjs = getDayjsInstance();

interface Props {
  mediaId: string;
  onPrev: Function;
  onNext: Function;
  onClose: Function;
  side?: -1 | 0 | 1;
}

const PhotoViewerAPIWrapper: React.FC<Props> = ({
  mediaId,
  onPrev,
  onNext,
  onClose,
  side,
}) => {
  const {
    data: mediaPost,
    isLoading,
    isFetching,
    error,
    currentData,
  } = useGetPostQuery(mediaId);

  usePhotoViewerFallback({
    isError: error ? (error as FetchBaseQueryError).status === 404 : false,
    side,
    onPrev,
    onNext,
    onClose,
  });

  let ContentJSX;

  if ((isLoading || isFetching) && !currentData) {
    ContentJSX = <PhotoViewerLoading />;
  } else if (mediaPost) {
    const {
      creatorId,
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
          creatorId={creatorId}
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
      onClose={onClose}
      onSlideLeft={onPrev}
      onSlideRight={onNext}
      side={side}
    >
      {ContentJSX}
    </PhotoViewerContainerWrapper>
  );
};
export default PhotoViewerAPIWrapper;
