import { useColorModeValue } from '@chakra-ui/react';
import useSetThemeColor from '../../hooks/useSetThemeColor';
import useBreakpointValue from '../../hooks/wrappers/useBreakpointValue';
import ChatPageMD from './ChatPageMD';
import ChatPageXS from './ChatPageXS';

const ChatPage: React.FC = () => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  useSetThemeColor(useColorModeValue('white', 'black'));

  const ComponentToRender = isDesktop ? ChatPageMD : ChatPageXS;

  return <ComponentToRender />;
};

export default ChatPage;
