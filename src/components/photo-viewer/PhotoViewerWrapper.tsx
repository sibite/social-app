import { useGetPostQuery } from '../../store/feed-api';
import { useAppSelector } from '../../store/hooks';
import PhotoViewerAPIWrapper from './PhotoViewerAPIWrapper';

const PostWrapper: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: parentPost } = useGetPostQuery(postId);

  if (parentPost?.media && parentPost.media.length !== 0)
    return (
      <PhotoViewerAPIWrapper
        mediaIds={parentPost.media.map(({ _id }) => _id)}
      />
    );

  return null;
};

const PhotoViewerWrapper: React.FC = () => {
  const { postId, mediaIds } = useAppSelector((state) => state.photoViewer);

  if (postId) return <PostWrapper postId={postId} />;

  if (mediaIds && mediaIds.length !== 0)
    return <PhotoViewerAPIWrapper mediaIds={mediaIds} />;

  return null;
};
export default PhotoViewerWrapper;
