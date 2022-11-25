import { useSearchParams } from 'react-router-dom';
import PostWrapper from './PostWrapper';
import ProfileMediaWrapper from './ProfileMediaWrapper';

const PhotoViewerWrapper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const profileId = searchParams.get('profileId');

  if (postId) return <PostWrapper postId={postId} />;

  if (profileId) return <ProfileMediaWrapper profileId={profileId} />;

  return null;
};
export default PhotoViewerWrapper;
