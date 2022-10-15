import {
  Center,
  Flex,
  Grid,
  GridItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ContactsHeader from './ContactsHeader';
import Contacts from './Contacts';
import LayoutBlock from './LayoutBlock';
import MessagesHeader from './MessagesHeader';
import UserDetails from './UserDetails';
import Messages from '../../components/messages/Messages';
import NavBar from '../../components/nav-bar/NavBar';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const ChatPageMD: React.FC = () => {
  const { id } = useParams();
  const { windowHeight } = useWindowDimensions();

  const gridStyle = {
    gridTemplateAreas: `"contacts-header messages-header user-details"
    "contacts        messages        user-details"`,
    gridTemplateRows: '60px 1fr',
    gridTemplateColumns: {
      md: '90px 1fr 300px',
      lg: '360px 1fr 340px',
      '2xl': '420px 1fr 420px',
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
    <Center h="100%">
      <Text opacity="0.5">
        Select a contact from the sidebar to start chatting
      </Text>
    </Center>
  );

  return (
    <Flex
      direction="column"
      width="100%"
      height={`${windowHeight}px`}
      overflow="hidden"
    >
      <NavBar />
      <Grid sx={gridStyle}>
        <GridItem area="contacts-header">
          <LayoutBlock>
            <ContactsHeader />
          </LayoutBlock>
        </GridItem>
        <GridItem area="contacts">
          <LayoutBlock>
            <Contacts />
          </LayoutBlock>
        </GridItem>
        <GridItem area="messages-header">
          <LayoutBlock>{id && <MessagesHeader profileId={id} />}</LayoutBlock>
        </GridItem>
        <GridItem area="messages">
          <LayoutBlock>
            {id ? <Messages profileId={id} /> : MessagesPlaceholderJSX}
          </LayoutBlock>
        </GridItem>
        <GridItem area="user-details">
          <LayoutBlock>{id && <UserDetails profileId={id} />}</LayoutBlock>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default ChatPageMD;
