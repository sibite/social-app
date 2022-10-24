import {
  Box,
  Container,
  useBoolean,
  useColorModeValue,
  useToast,
  UseToastOptions,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Feed from '../../components/feed/Feed';
import FollowingPanel from './following/FollowingPanel';
import PageContainer from '../../components/layout/PageContainer';
import PhotoViewerWrapper from '../../components/photo-viewer/wrappers/PhotoViewerWrapper';
import useMobileModeValue from '../../hooks/useIsMobile';
import {
  useUpdateDetailsMutation,
  useUploadAvatarMutation,
  useUploadCoverMutation,
} from '../../store/account-api';
import {
  useGetProfileFeedQuery,
  useGetProfileMediaQuery,
} from '../../store/feed-api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  profileApi,
  useGetProfileQuery,
  useToggleFollowMutation,
} from '../../store/profile-api';
import Gallery from '../gallery/Gallery';
import ErrorPage from '../ErrorPage';
import ProfileAvatar from './ProfileAvatar';
import ProfileCover from './ProfileCover';
import ProfileHeading from './ProfileHeading';
import ProfilePageSkeleton from './ProfilePageSkeleton';
import ProfileTabBar from './ProfileTabBar';

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [isEditing, setIsEditing] = useBoolean(false);
  const [isUploading, setIsUploading] = useBoolean(false);

  const errorToast: UseToastOptions = {
    title: 'Something went wrong',
    status: 'error',
    duration: 4000,
    position: useMobileModeValue('top', 'bottom'),
  };

  const successToast: UseToastOptions = {
    title: 'Profile updated',
    status: 'success',
    duration: 2000,
    position: useMobileModeValue('top', 'bottom'),
  };

  const [editingAvatar, setEditingAvatar] = useState<Blob | null>();
  const [editingCover, setEditingCover] = useState<Blob | null>();
  const [editingAvatarUrl, setEditingAvatarUrl] = useState<string | null>();
  const [editingCoverUrl, setEditingCoverUrl] = useState<string | null>();
  const [editingDescription, setEditingDescription] = useState<string | null>();

  let id = useParams().id || 'me';
  if (id === 'me') {
    id = auth.userId ?? 'unknown';
  }

  const isMine = id === auth.userId;

  const [toggleFollow] = useToggleFollowMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [uploadCover] = useUploadCoverMutation();
  const [updateDetails] = useUpdateDetailsMutation();

  const { currentData, isFetching, isLoading, isError, error } =
    useGetProfileQuery(id);
  const feedQuery = useGetProfileFeedQuery(id);
  const { refetch: refetchMediaFeed } = useGetProfileMediaQuery(id);

  const profile = currentData;
  const posts = feedQuery.currentData ?? [];

  const avatarSrc = editingAvatarUrl ?? profile?.avatarSrc;
  const coverSrc = editingCoverUrl ?? profile?.coverSrc;
  const description = editingDescription ?? profile?.description;

  const toggleFollowHandler = () => {
    toggleFollow(id);
  };

  const getEditingChangeFn =
    (setFn: (val: Blob) => any, setUrlFn: (val: string) => any) =>
    (newAvatar: Blob) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(newAvatar);
      fileReader.onload = () => setUrlFn(fileReader.result as string);
      setFn(newAvatar);
    };

  const avatarChangeHandler = getEditingChangeFn(
    setEditingAvatar,
    setEditingAvatarUrl
  );
  const coverChangeHandler = getEditingChangeFn(
    setEditingCover,
    setEditingCoverUrl
  );
  const descriptionChangeHandler = (newDescription: string) => {
    setEditingDescription(newDescription);
  };

  const cancelEditing = () => {
    setEditingAvatar(null);
    setEditingCover(null);
    setEditingAvatarUrl(null);
    setEditingCoverUrl(null);
    setEditingDescription(null);
    setIsEditing.off();
  };

  const saveHandler = async () => {
    setIsUploading.on();

    try {
      const requests = [
        editingAvatar ? uploadAvatar(editingAvatar).unwrap() : Promise.resolve,
        editingCover ? uploadCover(editingCover).unwrap() : Promise.resolve,
        editingDescription
          ? updateDetails({ description: editingDescription }).unwrap()
          : Promise.resolve,
      ];

      await Promise.all(requests);
      await dispatch(
        profileApi.endpoints.getProfile.initiate(id, {
          forceRefetch: true,
        })
      );
      if (editingAvatar || editingCover) {
        refetchMediaFeed();
      }
      cancelEditing();
      toast(successToast);
    } catch (err) {
      toast(errorToast);
    }
    setIsUploading.off();
  };

  const bg1 = useColorModeValue('gray.100', 'black');
  const bg2 = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.800');

  if (isError) return <ErrorPage status={(error as any)?.status} />;

  if ((isLoading || isFetching) && !currentData)
    return (
      <PageContainer bg={bg1}>
        <ProfilePageSkeleton />
      </PageContainer>
    );

  return (
    <PageContainer bg={bg1} key={id}>
      <PhotoViewerWrapper />
      <Box
        width="100%"
        bg={bg2}
        borderBottom="1px solid"
        borderBottomColor={borderColor}
      >
        <Container maxWidth="container.lg" p={0}>
          <ProfileCover
            coverSrc={coverSrc}
            isEditing={isEditing}
            isUploading={isUploading}
            onChange={coverChangeHandler}
          />
          <ProfileAvatar
            name={profile?.fullName}
            avatarSrc={avatarSrc}
            isEditing={isEditing}
            isUploading={isUploading}
            onChange={avatarChangeHandler}
          />
          <VStack spacing={4} pt={6} px={4}>
            <ProfileHeading
              name={profile?.fullName}
              description={description}
              isEditing={isEditing}
              isUploading={isUploading}
              onChange={descriptionChangeHandler}
            />
            <ProfileTabBar
              profileId={id}
              isEditing={isEditing}
              isUploading={isUploading}
              isMine={isMine}
              followed={profile?.isFollowed}
              followingCount={profile?.following?.length || 0}
              editOn={setIsEditing.on}
              editOff={cancelEditing}
              onSave={saveHandler}
              toggleFollow={toggleFollowHandler}
            />
          </VStack>
        </Container>
      </Box>
      <Container maxWidth="container.lg" px={0}>
        <Routes>
          <Route path="*" element={<Navigate to="feed" replace />} />
          <Route
            path="feed"
            element={
              <Feed
                posts={posts}
                isLoading={!feedQuery.currentData}
                showPostCreator={isMine}
              />
            }
          />
          <Route path="photos" element={<Gallery profileId={id} />} />
          <Route
            path="following"
            element={<FollowingPanel followed={profile?.following || []} />}
          />
        </Routes>
      </Container>
    </PageContainer>
  );
};

export default ProfilePage;
