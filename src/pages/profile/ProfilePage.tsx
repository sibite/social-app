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
import PageContainer from '../../components/layout/PageContainer';
import { accountApi } from '../../store/account-api';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { profileApi, useGetProfileQuery } from '../../store/profile-api';
import Gallery from './Gallery';
import ProfileAvatar from './ProfileAvatar';
import ProfileCover from './ProfileCover';
import ProfileHeading from './ProfileHeading';
import ProfileTabBar from './ProfileTabBar';

interface Props {
  isMine?: boolean;
}

const ProfilePage: React.FC<Props> = ({ isMine = true }) => {
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

  const { data, error, isLoading } = useGetProfileQuery(id);
  const profile = data ?? {};

  const avatarSrc = editingAvatarUrl ?? profile?.avatarSrc;
  const coverSrc = editingCoverUrl ?? profile?.coverSrc;
  const description = editingDescription ?? profile?.description;

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
        if (editingDescription) {
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
  const bgCard = useColorModeValue('white', 'gray.900');

  return (
    <PageContainer width="100%" bg={bg1}>
      <Box width="100%" bg={bgCard}>
        <Container maxWidth="container.lg">
          <Box width="100%">
            <ProfileCover
              coverSrc={coverSrc}
              isEditing={isEditing}
              isUploading={isUploading}
              onChange={coverChangeHandler}
            />
            <ProfileAvatar
              name={profile.fullName}
              avatarSrc={avatarSrc}
              isEditing={isEditing}
              isUploading={isUploading}
              onChange={avatarChangeHandler}
            />
            <VStack spacing={4} pt={6}>
              <ProfileHeading
                name={profile.fullName}
                description={description}
                isEditing={isEditing}
                isUploading={isUploading}
                onChange={descriptionChangeHandler}
              />
              <ProfileTabBar
                isEditing={isEditing}
                isUploading={isUploading}
                isMine={isMine}
                editOn={setIsEditing.on}
                editOff={cancelEditing}
                onSave={saveHandler}
              />
            </VStack>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="container.lg">
        <Routes>
          <Route path="*" element={<Navigate to="feed" />} />
          <Route path="feed" element={<Feed posts={storeProfile.feed} />} />
          <Route
            path="photos"
            element={<Gallery photos={storeProfile.photos} />}
          />
        </Routes>
      </Container>
    </PageContainer>
  );
};

export default ProfilePage;
