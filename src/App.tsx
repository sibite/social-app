import { ChakraProvider } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/chat/ChatPage';
import LogInPage from './pages/log-in/LogInPage';
import ProfilePage from './pages/profile/ProfilePage';
import SignUpPage from './pages/sign-up/SignUpPage';
import theme from './theme';

const App = () => (
  <ChakraProvider theme={theme}>
    <Routes>
      <Route path="*" element={<Navigate to="profile" />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/messages" element={<ChatPage />} />
      <Route path="/profile/*" element={<ProfilePage />} />
    </Routes>
  </ChakraProvider>
);

export default App;
