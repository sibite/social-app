import { useGetPostQuery } from '../../store/feed-api';
import { useAppSelector } from '../../store/hooks';
import PhotoViewerAPIWrapper from './PhotoViewerAPIWrapper';

const PostWrapper: React.FC<{ postId: string }> = ({ postId }) => {
  const { data: parentPost } = useGetPostQuery(postId);

  if (parentPost?.media)
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

  if (mediaIds) return <PhotoViewerAPIWrapper mediaIds={mediaIds} />;

  return null;
};
export default PhotoViewerWrapper;
