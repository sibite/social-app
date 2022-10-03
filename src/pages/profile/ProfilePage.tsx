import {
  Box,
  Container,
  useBoolean,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Feed from '../../components/feed/Feed';
import Following from '../../components/followers/Following';
import PageContainer from '../../components/layout/PageContainer';
import PhotoViewerWrapper from '../../components/photo-viewer/PhotoViewerWrapper';
import { accountApi } from '../../store/account-api';
import { useGetProfileFeedQuery } from '../../store/feed-api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  profileApi,
  useGetProfileQuery,
  useToggleFollowMutation,
} from '../../store/profile-api';
import Gallery from './Gallery';
import ProfileAvatar from './ProfileAvatar';
import ProfileCover from './ProfileCover';
import ProfileHeading from './ProfileHeading';
import ProfileTabBar from './ProfileTabBar';

interface Props {}

const ProfilePage: React.FC<Props> = () => {
  const storeProfile = useAppSelector((state) => state.profile);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [isEditing, setIsEditing] = useBoolean(false);
  const [isUploading, setIsUploading] = useBoolean(false);

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
  const { data, isError, isLoading } = useGetProfileQuery(id);
  const feedQuery = useGetProfileFeedQuery(id);
  const profile = data;

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
      await new Promise<void>((resolve, reject) => {
        const requests = [];
        if (editingAvatar) {
          requests.push(
            dispatch(accountApi.endpoints.uploadAvatar.initiate(editingAvatar))
          );
        }
        if (editingCover) {
          requests.push(
            dispatch(accountApi.endpoints.uploadCover.initiate(editingCover))
          );
        }
        if (typeof editingDescription === 'string') {
          requests.push(
            dispatch(
              accountApi.endpoints.patchDetails.initiate({
                description: editingDescription,
              })
            )
          );
        }
        let count = requests.length;
        if (count === 0) resolve();
        requests.forEach((request) => {
          request.then(() => {
            count -= 1;
            if (count === 0) resolve();
          });
        });
      });
    } catch (err) {
      setIsUploading.off();
    }

    dispatch(
      accountApi.endpoints.getAccountData.initiate(undefined, {
        forceRefetch: true,
      })
    );
    await dispatch(
      profileApi.endpoints.getProfile.initiate(id, {
        forceRefetch: true,
      })
    );
    cancelEditing();
    setIsUploading.off();
  };

  const bg1 = useColorModeValue('gray.100', 'black');
  const bg2 = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <PageContainer bg={bg1}>
      <PhotoViewerWrapper />
      <Box
        width="100%"
        bg={bg2}
        borderBottom="1px solid"
        borderBottomColor={borderColor}
      >
        <Container maxWidth="container.lg">
          <Box width="100%">
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
            <VStack spacing={4} pt={6}>
              <ProfileHeading
                name={profile?.fullName}
                description={description}
                isEditing={isEditing}
                isUploading={isUploading}
                onChange={descriptionChangeHandler}
              />
              <ProfileTabBar
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
          </Box>
        </Container>
      </Box>
      <Container maxWidth="container.lg">
        <Routes>
          <Route path="*" element={<Navigate to="feed" replace />} />
          <Route path="feed" element={<Feed posts={feedQuery.data ?? []} />} />
          <Route
            path="photos"
            element={<Gallery photos={storeProfile.photos} />}
          />
          <Route
            path="following"
            element={<Following followed={profile?.following || []} />}
          />
        </Routes>
      </Container>
    </PageContainer>
  );
};

export default ProfilePage;
