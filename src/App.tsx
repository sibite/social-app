import { ChakraProvider } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';

const App = () => (
  <ChakraProvider>
    <Routes>
      <Route path="*" element={<Navigate to="sign-up" />} />
      <Route path="sign-up" element={<SignUpPage />} />
    </Routes>
  </ChakraProvider>
);

export default App;
