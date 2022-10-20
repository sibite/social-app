import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './AppRoutes';
import MessagesProvider from './components/messages/MessagesProvider';
import useIsAuthenticated from './hooks/useIsAuthenticated';
import theme from './theme';

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <ChakraProvider theme={theme}>
      {isAuthenticated && <MessagesProvider />}
      <AppRoutes />
    </ChakraProvider>
  );
};

export default App;
