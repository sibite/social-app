import {
  Container,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react';
import PageContainer from '../../components/layout/PageContainer';
import YourDetailsPanel from './YourDetailsPanel';

const SettingsPage: React.FC = () => (
  <PageContainer>
    <Container maxWidth="container.md" width="100%" py={10} px={4}>
      <VStack spacing={8} alignItems="stretch">
        <Heading as="h2" size="lg" alignSelf="flex-start" mx={0}>
          Settings
        </Heading>
        <Tabs>
          <TabList>
            <Tab>Your details</Tab>
          </TabList>
          <TabPanels>
            <TabPanel py={8} px={0}>
              <YourDetailsPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  </PageContainer>
);
export default SettingsPage;
