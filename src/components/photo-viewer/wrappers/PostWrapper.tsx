import { useSearchParams } from 'react-router-dom';
import { useGetPostQuery } from '../../../store/feed-api';
import PhotoViewerMediaListWrapper from './MediaListWrapper';

const PhotoViewerPostWrapper: React.FC<{ postId: string }> = ({ postId }) => {
  const searchParams = useSearchParams()[0];
  const { data: parentPost } = useGetPostQuery(postId);

  const mediaId = searchParams.get('mediaId');
  const mediaList = (parentPost?.media ?? []).map((media) => media._id);

  if (!mediaId) return null;

  return (
    <PhotoViewerMediaListWrapper mediaId={mediaId} mediaList={mediaList} />
  );
};

export default PhotoViewerPostWrapper;
