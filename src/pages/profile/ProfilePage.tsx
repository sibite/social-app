import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ChatAltIcon } from '@heroicons/react/outline';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import Feed from '../../components/feed/Feed';
import PageContainer from '../../components/layout/PageContainer';
import useBackgroundColor from '../../hooks/useBackgroundColor';
import { useAppSelector } from '../../store/hooks';
import Gallery from './Gallery';

const ProfilePage: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);

  const bg = useBackgroundColor();

  const bg1 = useColorModeValue('gray.100', 'black');
  const bgCard = useColorModeValue('white', 'gray.900');

  const avatarStyle = {
    position: 'absolute',
    bottom: 0,
    borderWidth: 5,
    borderColor: bg.color200,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.14)',
  };

  return (
    <PageContainer width="100%" bg={bg1}>
      <Box width="100%" bg={bgCard}>
        <Container maxWidth="container.lg">
          <Box width="100%">
            <AspectRatio width="100%" ratio={3}>
              <Box width="100%" bg={bg.color100} borderBottomRadius="lg" />
            </AspectRatio>
            <Center width="100%" height="50px" position="relative">
              <Avatar
                src={profile.avatarSrc}
                size={['xl', '2xl', '3xl']}
                name={profile.name}
                sx={avatarStyle}
              />
            </Center>
            <VStack spacing={4} pt={6}>
              <Heading as="h1" size="lg">
                {profile.name}
              </Heading>
              <Text maxWidth="400px" opacity={0.8} px={4} textAlign="center">
                {profile.content}
              </Text>
              <Flex width="100%" justify="space-between">
                <Tabs>
                  <TabList mt={2}>
                    <Link to="feed">
                      <Tab>Feed</Tab>
                    </Link>
                    <Link to="photos">
                      <Tab>Photos</Tab>
                    </Link>
                  </TabList>
                </Tabs>
                <Button leftIcon={<HeroIcon as={ChatAltIcon} />} mx={2}>
                  Chat
                </Button>
              </Flex>
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
