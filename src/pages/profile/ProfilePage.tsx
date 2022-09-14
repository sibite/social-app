import { ChatIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Avatar,
  Box,
  Container,
  Center,
  VStack,
  Heading,
  Text,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  Button,
  Flex,
} from '@chakra-ui/react';
import Feed from '../../components/feed/Feed';
import useBackgroundColor from '../../hooks/useBackgroundColor';
import { useAppSelector } from '../../store/hooks';

const ProfilePage: React.FC = () => {
  const profile = useAppSelector((state) => state.profile);

  const bg = useBackgroundColor();

  const avatarStyle = {
    position: 'absolute',
    bottom: 0,
    borderWidth: 5,
    borderColor: bg.color200,
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.14)',
  };

  return (
    <Box width="100%" minHeight="100vh" bg={bg.color0}>
      <Tabs>
        <Box width="100%" bg={bg.color50}>
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
                  <Button leftIcon={<ChatIcon />} mx={2}>
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
            <TabPanel>
              <h2>Photos</h2>
            </TabPanel>
          </TabPanels>
        </Container>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;
