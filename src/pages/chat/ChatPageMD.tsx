import {
  Center,
  Grid,
  Text,
  useBoolean,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Messages from '../../components/messages/Messages';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { NAVBAR_TOTAL_HEIGHT } from '../../shared/navBarHeight';
import Contacts from './Contacts';
import ContactsHeader from './ContactsHeader';
import LayoutBlock from './LayoutBlock';
import MessagesHeader from './MessagesHeader';
import UserDetails from './UserDetails';

const ChatPageMD: React.FC = () => {
  const { id } = useParams();
  const { windowHeight } = useWindowDimensions();
  const [showUserDetails, setShowUserDetails] = useBoolean(true);

  const gridStyle = {
    gridTemplateAreas: `"contacts-header messages-header user-details"
    "contacts        messages        user-details"`,
    gridTemplateRows: '60px 1fr',
    gridTemplateColumns: {
      md: `90px 1fr ${showUserDetails ? 300 : 0}px`,
      lg: `360px 1fr ${showUserDetails ? 340 : 0}px`,
      '2xl': `420px 1fr ${showUserDetails ? 420 : 0}px`,
    },
    width: '100%',
    flexGrow: 1,
    overflow: 'hidden',
    gap: '1px',
    bgColor: useColorModeValue('gray.200', 'gray.800'),
    '& > *': {
      overflow: 'hidden',
    },
  };

  const MessagesPlaceholderJSX = (
    <Center h="100%" p={4}>
      <Text opacity="0.5" textAlign="center">
        Select a contact from the sidebar to start chatting
      </Text>
    </Center>
  );

  return (
    <PageContainer overflow="hidden">
      <Grid sx={gridStyle} height={`${windowHeight - NAVBAR_TOTAL_HEIGHT}px`}>
        <LayoutBlock gridArea="contacts-header">
          <ContactsHeader />
        </LayoutBlock>
        <LayoutBlock gridArea="contacts">
          <Contacts />
        </LayoutBlock>
        <LayoutBlock gridArea="messages-header">
          {id && (
            <MessagesHeader
              profileId={id}
              onToggleUserDetails={setShowUserDetails.toggle}
            />
          )}
        </LayoutBlock>
        <LayoutBlock gridArea="messages">
          {id ? <Messages profileId={id} /> : MessagesPlaceholderJSX}
        </LayoutBlock>
        {showUserDetails && (
          <LayoutBlock gridArea="user-details">
            {id && <UserDetails profileId={id} />}
          </LayoutBlock>
        )}
      </Grid>
    </PageContainer>
  );
};

export default ChatPageMD;
