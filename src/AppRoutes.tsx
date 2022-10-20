import { Navigate, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/chat/ChatPage';
import FeedPage from './pages/feed/FeedPage';
import LogInPage from './pages/log-in/LogInPage';
import ProfilePage from './pages/profile/ProfilePage';
import SearchPage from './pages/search/SearchPage';
import SignUpPage from './pages/sign-up/SignUpPage';
import SinglePostPage from './pages/single-post/SinglePostPage';
import { useAppSelector } from './store/hooks';

const AppRoutes = () => {
  const authState = useAppSelector((state) => state.auth);
  const isAuthenticated = authState.token && authState.userId;
  const defaultPage = isAuthenticated ? '/feed' : '/login';

  return (
    <Routes>
      <Route path="*" element={<Navigate to={defaultPage} replace />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/profile/:id/*" element={<ProfilePage />} />
      <Route path="/post/:id" element={<SinglePostPage />} />
      {isAuthenticated && (
        <>
          <Route path="/search/:searchQuery" element={<SearchPage />} />
          <Route path="/messages/:id" element={<ChatPage />} />
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/profile" element={<Navigate to="me" />} />
          <Route path="/feed/*" element={<FeedPage />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
