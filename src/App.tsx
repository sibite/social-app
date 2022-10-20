import { ChakraProvider } from '@chakra-ui/react';
import AppRoutes from './AppRoutes';
import MessagesProvider from './components/messages/MessagesProvider';
import { useAppSelector } from './store/hooks';
import theme from './theme';

const App = () => {
  const authState = useAppSelector((state) => state.auth);
  const isAuthenticated = authState.token && authState.userId;

  return (
    <ChakraProvider theme={theme}>
      {isAuthenticated && <MessagesProvider />}
      <AppRoutes />
    </ChakraProvider>
  );
};

export default App;
