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
import AccountPanel from './AccountPanel';
import ChangePasswordPanel from './ChangePasswordPanel';
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
            <Tab>Password</Tab>
            <Tab>Account</Tab>
          </TabList>
          <TabPanels>
            <TabPanel py={8} px={0}>
              <YourDetailsPanel />
            </TabPanel>
            <TabPanel py={8} px={0}>
              <ChangePasswordPanel />
            </TabPanel>
            <TabPanel py={8} px={0}>
              <AccountPanel />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  </PageContainer>
);
export default SettingsPage;
