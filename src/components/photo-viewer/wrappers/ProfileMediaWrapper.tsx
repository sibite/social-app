import { useSearchParams } from 'react-router-dom';
import { useGetProfileMediaQuery } from '../../../store/feed-api';
import PhotoViewerMediaListWrapper from './MediaListWrapper';

const PhotoViewerProfileMediaWrapper: React.FC<{ profileId: string }> = ({
  profileId,
}) => {
  const searchParams = useSearchParams()[0];
  const { data: mediaListFetched } = useGetProfileMediaQuery(profileId);

  const mediaId = searchParams.get('mediaId');
  const mediaList = mediaListFetched ?? [];

  if (!mediaId) return null;

  return (
    <PhotoViewerMediaListWrapper mediaId={mediaId} mediaList={mediaList} />
  );
};

export default PhotoViewerProfileMediaWrapper;
