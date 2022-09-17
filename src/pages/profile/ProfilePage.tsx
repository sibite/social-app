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
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { ChatAltIcon } from '@heroicons/react/outline';
import HeroIcon from '../../components/chakra-ui/HeroIcon';
import Feed from '../../components/feed/Feed';
import PageContainer from '../../components/layout/PageContainer';
import FixedContainer from '../../components/misc/FixedContainer';
import NavBar from '../../components/nav-bar/NavBar';
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
      <Tabs isLazy>
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
                  <TabList mt={2}>
                    <Tab>Feed</Tab>
                    <Tab>Photos</Tab>
                  </TabList>
                  <Button leftIcon={<HeroIcon as={ChatAltIcon} />} mx={2}>
                    Chat
                  </Button>
                </Flex>
              </VStack>
            </Box>
          </Container>
        </Box>
        <Container maxWidth="container.lg">
          <TabPanels>
            <TabPanel py={10}>
              <Feed posts={profile.feed} />
            </TabPanel>
            <TabPanel px={0}>
              <Gallery photos={profile.photos} />
            </TabPanel>
          </TabPanels>
        </Container>
      </Tabs>
    </PageContainer>
  );
};

export default ProfilePage;
