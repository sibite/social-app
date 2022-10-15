import {
  Flex,
  Grid,
  GridItem,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContactsHeader from './ContactsHeader';
import Contacts from './Contacts';
import LayoutBlock from './LayoutBlock';
import MessagesHeader from './MessagesHeader';
import UserDetails from './UserDetails';
import Messages from '../../components/messages/Messages';
import NavBar from '../../components/nav-bar/NavBar';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const ChatPageXS: React.FC = () => {
  const [section, setSection] = useState<
    'contacts' | 'messages' | 'user-details' | 'none'
  >('none');
  const { id } = useParams();
  const { windowHeight } = useWindowDimensions();

  useEffect(() => {
    if (!id) setSection('contacts');
    else setSection('messages');
  }, [id]);

  const gridStyle = {
    gridTemplateRows: '60px 1fr',
    gridTemplateColumns: '100%',
    width: '100%',
    flexGrow: 1,
    overflow: 'hidden',
    gap: '1px',
    bgColor: useColorModeValue('gray.200', 'gray.800'),
    '& > *': {
      overflow: 'hidden',
    },
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      direction={isMobile ? 'column-reverse' : 'column'}
      width="100%"
      height={`${windowHeight}px`}
      overflow="hidden"
    >
      <NavBar />
      <Grid sx={gridStyle}>
        {section === 'contacts' && (
          <>
            <GridItem>
              <LayoutBlock>
                <ContactsHeader />
              </LayoutBlock>
            </GridItem>
            <GridItem>
              <LayoutBlock>
                <Contacts />
              </LayoutBlock>
            </GridItem>
          </>
        )}
        {section === 'messages' && (
          <>
            <GridItem>
              <LayoutBlock>
                {id && <MessagesHeader profileId={id} />}
              </LayoutBlock>
            </GridItem>
            <GridItem>
              <LayoutBlock>{id && <Messages profileId={id} />}</LayoutBlock>
            </GridItem>
          </>
        )}
        {section === 'user-details' && (
          <GridItem>
            <LayoutBlock>{id && <UserDetails profileId={id} />}</LayoutBlock>
          </GridItem>
        )}
      </Grid>
    </Flex>
  );
};

export default ChatPageXS;
