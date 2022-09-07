import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import ContactsHeader from './ContactsHeader';
import Contacts from './Contacts';
import LayoutBlock from './LayoutBlock';
import MessagesHeader from './MessagesHeader';

const ChatPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.800');

  return (
    <Grid
      templateAreas={`"contacts-header messages-header user-card"
                      "contacts        messages        user-card"`}
      templateRows="60px 1fr"
      templateColumns="480px 1fr 480px"
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
        <LayoutBlock>Messages</LayoutBlock>
      </GridItem>
      <GridItem area="user-card">
        <LayoutBlock>user-card</LayoutBlock>
      </GridItem>
    </Grid>
  );
};

export default ChatPage;
