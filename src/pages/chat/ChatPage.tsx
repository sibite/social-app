import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import ContactsHeader from './ContactsHeader';
import Contacts from './Contacts';
import LayoutBlock from './LayoutBlock';
import MessagesHeader from './MessagesHeader';
import UserDetails from './UserDetails';
import Messages from './messages/Messages';

const ChatPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Grid
      templateAreas={`"contacts-header messages-header user-details"
                      "contacts        messages        user-details"`}
      templateRows="60px 1fr"
      templateColumns={{
        md: '90px 1fr 340px',
        lg: '360px 1fr 340px',
        '2xl': '420px 1fr 420px',
      }}
      w="full"
      h="100vh"
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
        <LayoutBlock>
          <MessagesHeader />
        </LayoutBlock>
      </GridItem>
      <GridItem area="messages">
        <LayoutBlock>
          <Messages />
        </LayoutBlock>
      </GridItem>
      <GridItem area="user-details">
        <LayoutBlock>
          <UserDetails />
        </LayoutBlock>
      </GridItem>
    </Grid>
  );
};

export default ChatPage;
