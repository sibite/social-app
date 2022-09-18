import {
  Box,
  Container,
  useBoolean,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Feed from '../../components/feed/Feed';
import PageContainer from '../../components/layout/PageContainer';
import { useAppSelector } from '../../store/hooks';
import Gallery from './Gallery';
import ProfileAvatar from './ProfileAvatar';
import ProfileCover from './ProfileCover';
import ProfileHeading from './ProfileHeading';
import ProfileTabBar from './ProfileTabBar';

interface Props {
  isMine?: boolean;
}

const ProfilePage: React.FC<Props> = ({ isMine = true }) => {
  const [isEditing, setIsEditing] = useBoolean(false);
  const profile = useAppSelector((state) => state.profile);

  const bg1 = useColorModeValue('gray.100', 'black');
  const bgCard = useColorModeValue('white', 'gray.900');

  return (
    <PageContainer width="100%" bg={bg1}>
      <Box width="100%" bg={bgCard}>
        <Container maxWidth="container.lg">
          <Box width="100%">
            <ProfileCover isEditing={isEditing} />
            <ProfileAvatar
              name={profile.name}
              avatarSrc={profile.avatarSrc}
              isEditing={isEditing}
            />
            <VStack spacing={4} pt={6}>
              <ProfileHeading
                name={profile.name}
                description={profile.content}
                isEditing={isEditing}
              />
              <ProfileTabBar
                isEditing={isEditing}
                isMine={isMine}
                editOn={setIsEditing.on}
                editOff={setIsEditing.off}
              />
            </VStack>
          </Box>
        </Container>
      </Box>
      <Container maxWidth="container.lg">
        <Routes>
          <Route path="*" element={<Navigate to="feed" />} />
          <Route path="feed" element={<Feed posts={profile.feed} />} />
          <Route path="photos" element={<Gallery photos={profile.photos} />} />
        </Routes>
      </Container>
    </PageContainer>
  );
};

export default ProfilePage;
