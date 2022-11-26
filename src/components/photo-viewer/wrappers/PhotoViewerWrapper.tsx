import { useMatch, useParams, useSearchParams } from 'react-router-dom';
import PostWrapper from './PostWrapper';
import ProfileMediaWrapper from './ProfileMediaWrapper';

const PhotoViewerWrapper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { id: profileIdParam } = useParams();
  const match = useMatch('/profile/*');
  const postId = searchParams.get('postId');
  const profileId = searchParams.get('profileId') || (match && profileIdParam);

  if (postId) return <PostWrapper postId={postId} />;

  if (profileId) return <ProfileMediaWrapper profileId={profileId} />;

  return null;
};
export default PhotoViewerWrapper;
