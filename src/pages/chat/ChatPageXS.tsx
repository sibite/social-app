import { Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Messages from '../../components/messages/Messages';
import NavBar from '../../components/nav-bar/NavBar';
import useMobileModeValue from '../../hooks/useIsMobile';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Contacts from './Contacts';
import ContactsHeader from './ContactsHeader';
import LayoutBlock from './LayoutBlock';
import MessagesHeader from './MessagesHeader';
import UserDetails from './UserDetails';
import UserDetailsHeader from './UserDetailsHeader';

const ChatPageXS: React.FC = () => {
  const [section, setSection] = useState<
    'contacts' | 'messages' | 'user-details' | 'none'
  >('none');
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { windowHeight } = useWindowDimensions();

  const userDetailsToggleHandler = () => {
    setSearchParams((prev) => {
      if (searchParams.get('details') === '1') prev.delete('details');
      else prev.set('details', '1');
      return prev;
    });
  };

  useEffect(() => {
    if (searchParams.get('details') === '1') setSection('user-details');
    else if (id) setSection('messages');
    else setSection('contacts');
  }, [id, searchParams]);

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

  const flexDirection = useMobileModeValue('column-reverse', 'column');

  return (
    <Flex
      direction={flexDirection}
      width="100%"
      height={`${windowHeight}px`}
      overflow="hidden"
    >
      <NavBar />
      <Grid sx={gridStyle}>
        {section === 'contacts' && (
          <>
            <LayoutBlock>
              <ContactsHeader />
            </LayoutBlock>
            <LayoutBlock>
              <Contacts />
            </LayoutBlock>
          </>
        )}
        {section === 'messages' && (
          <>
            <LayoutBlock>
              {id && (
                <MessagesHeader
                  profileId={id}
                  onToggleUserDetails={userDetailsToggleHandler}
                />
              )}
            </LayoutBlock>
            <LayoutBlock>{id && <Messages profileId={id} />}</LayoutBlock>
          </>
        )}
        {section === 'user-details' && (
          <>
            <LayoutBlock>
              <UserDetailsHeader
                onToggleUserDetails={userDetailsToggleHandler}
              />
            </LayoutBlock>
            <LayoutBlock>{id && <UserDetails profileId={id} />}</LayoutBlock>
          </>
        )}
      </Grid>
    </Flex>
  );
};

export default ChatPageXS;
