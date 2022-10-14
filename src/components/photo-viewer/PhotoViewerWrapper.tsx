import { useSearchParams } from 'react-router-dom';
import { useGetPostQuery, useGetProfileMediaQuery } from '../../store/feed-api';
import PhotoViewerAPIWrapper from './PhotoViewerAPIWrapper';

const getAdjustedIndex = (arr: any[], index: number) =>
  Math.max(0, Math.min(arr.length - 1, index));

const MediaListWrapper: React.FC<{ mediaList: string[]; mediaId: string }> = ({
  mediaList,
  mediaId,
}) => {
  const setSearchParams = useSearchParams()[1];

  const currentIndex = mediaId ? mediaList.indexOf(mediaId) : null;

  const side = ((i) => {
    if (mediaList.length <= 1) return 0;
    if (i === 0) return -1;
    if (i === mediaList.length - 1) return 1;
    return undefined;
  })(currentIndex);

  const prevHandler = () => {
    const newIndex =
      currentIndex !== null ? getAdjustedIndex(mediaList, currentIndex - 1) : 0;
    setSearchParams((prevSP) => {
      prevSP.set('mediaId', mediaList[newIndex]);
      return prevSP;
    });
  };

  const nextHandler = () => {
    const newIndex =
      currentIndex !== null
        ? getAdjustedIndex(mediaList, currentIndex + 1)
        : mediaList.length - 1;
    setSearchParams((prevSP) => {
      prevSP.set('mediaId', mediaList[newIndex]);
      return prevSP;
    });
  };

  const closeHandler = () => {
    setSearchParams((prevSP) => {
      prevSP.delete('mediaId');
      prevSP.delete('postId');
      return prevSP;
    });
  };

  return (
    <PhotoViewerAPIWrapper
      mediaId={mediaId}
      onPrev={prevHandler}
      onNext={nextHandler}
      onClose={closeHandler}
      side={side}
    />
  );
};

const PostWrapper: React.FC<{ postId: string }> = ({ postId }) => {
  const searchParams = useSearchParams()[0];
  const { data: parentPost } = useGetPostQuery(postId);

  const mediaId = searchParams.get('mediaId');
  const mediaList = (parentPost?.media ?? []).map((media) => media._id);

  if (!mediaId) return null;

  return <MediaListWrapper mediaId={mediaId} mediaList={mediaList} />;
};

const ProfileMediaWrapper: React.FC<{ profileId: string }> = ({
  profileId,
}) => {
  const searchParams = useSearchParams()[0];
  const { data: mediaListFetched } = useGetProfileMediaQuery(profileId);

  const mediaId = searchParams.get('mediaId');
  const mediaList = mediaListFetched ?? [];

  if (!mediaId) return null;

  return <MediaListWrapper mediaId={mediaId} mediaList={mediaList} />;
};

const PhotoViewerWrapper: React.FC = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');
  const profileId = searchParams.get('profileId');

  if (postId) return <PostWrapper postId={postId} />;

  if (profileId) return <ProfileMediaWrapper profileId={profileId} />;

  return null;
};
export default PhotoViewerWrapper;
