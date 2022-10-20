import { Navigate, Route, Routes } from 'react-router-dom';
import useIsAuthenticated from './hooks/useIsAuthenticated';
import ChatPage from './pages/chat/ChatPage';
import ErrorPage from './pages/ErrorPage';
import FeedPage from './pages/feed/FeedPage';
import LogInPage from './pages/log-in/LogInPage';
import ProfilePage from './pages/profile/ProfilePage';
import SearchPage from './pages/search/SearchPage';
import SignUpPage from './pages/sign-up/SignUpPage';
import SinglePostPage from './pages/single-post/SinglePostPage';

const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Routes>
      <Route path="/profile/:id/*" element={<ProfilePage />} />
      <Route path="/post/:id" element={<SinglePostPage />} />
      <Route path="/not-found" element={<ErrorPage status={404} />} />
      {isAuthenticated && (
        <>
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          <Route path="/search/:searchQuery" element={<SearchPage />} />
          <Route path="/messages/:id" element={<ChatPage />} />
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/profile" element={<Navigate to="me" />} />
          <Route path="/feed/*" element={<FeedPage />} />
          <Route path="/signup" element={<Navigate to="/profile" />} />
          <Route path="/login" element={<Navigate to="/profile" />} />
        </>
      )}
      {!isAuthenticated && (
        <>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
