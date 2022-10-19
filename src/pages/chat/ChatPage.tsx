import { useBreakpointValue } from '@chakra-ui/react';
import ChatPageMD from './ChatPageMD';
import ChatPageXS from './ChatPageXS';

const ChatPage: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const ComponentToRender = isDesktop ? ChatPageMD : ChatPageXS;

  return <ComponentToRender />;
};

export default ChatPage;
