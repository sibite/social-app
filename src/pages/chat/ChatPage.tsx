import { Flex, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ContactsHeader from './ContactsHeader';
import Contacts from './Contacts';
import LayoutBlock from './LayoutBlock';
import MessagesHeader from './MessagesHeader';
import UserDetails from './UserDetails';
import Messages from './messages/Messages';
import NavBar from '../../components/nav-bar/NavBar';

const ChatPage: React.FC = () => {
  const { id } = useParams();
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Flex direction="column" width="100%" height="100vh">
      <NavBar />
      <Grid
        templateAreas={`"contacts-header messages-header user-details"
                      "contacts        messages        user-details"`}
        templateRows="60px 1fr"
        templateColumns={{
          md: '90px 1fr 340px',
          lg: '360px 1fr 340px',
          '2xl': '420px 1fr 420px',
        }}
        w="100%"
        flexGrow={1}
        gap="1px"
        bg={bgColor}
      >
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
          <LayoutBlock>{id && <Messages profileId={id} />}</LayoutBlock>
        </GridItem>
        <GridItem area="user-details">
          <LayoutBlock>{id && <UserDetails profileId={id} />}</LayoutBlock>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default ChatPage;
