import { ChakraProvider } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/chat/ChatPage';
import LogInPage from './pages/LogInPage';
import SignUpPage from './pages/SignUpPage';
import theme from './theme';

const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="*" element={<Navigate to="sign-up" />} />
      <Route path="sign-up" element={<SignUpPage />} />
      <Route path="login" element={<LogInPage />} />
      <Route path="messages" element={<ChatPage />} />
    </Routes>
  </ChakraProvider>
);

export default App;
