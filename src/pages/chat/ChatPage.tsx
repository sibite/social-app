import { useBreakpointValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import ChatPageMD from './ChatPageMD';
import ChatPageXS from './ChatPageXS';

const ChatPage: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'hidden';
    };
  }, []);

  const ComponentToRender = isDesktop ? ChatPageMD : ChatPageXS;

  return <ComponentToRender />;
};

export default ChatPage;
