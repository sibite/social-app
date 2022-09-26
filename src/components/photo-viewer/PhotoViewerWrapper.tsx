import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import formatDate from '../../shared/formatDate';
import { useGetPostQuery } from '../../store/feed-api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeMediaGroup } from '../../store/photo-viewer';
import PhotoContainer from './PhotoContainer';
import PhotoSideContent from './PhotoSideContent';
import PhotoViewer from './PhotoViewer';

const PhotoViewerWrapper: React.FC = () => {
  const { visible, mediaIds, initialIndex } = useAppSelector(
    (state) => state.photoViewer
  );
  const dispatch = useAppDispatch();

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, mediaIds]);

  const closePhotoViewer = () => {
    dispatch(closeMediaGroup());
  };

  const mediaId = mediaIds[currentIndex];
  const { data, isLoading } = useGetPostQuery(mediaId);

  if (!visible || !data) return null;

  const { media, fullName, avatarSrc, content, date, likedBy, options } = data;

  return (
    <PhotoViewer onClose={closePhotoViewer}>
      <PhotoContainer src={media[0].src!} />
      <PhotoSideContent
        postId={mediaId}
        avatarSrc={avatarSrc}
        options={options}
        name={fullName}
        content={content}
        dateString={formatDate(dayjs(date).subtract(5, 'minutes'))}
        likedBy={likedBy}
        comments={[]}
      />
    </PhotoViewer>
  );
};
export default PhotoViewerWrapper;
