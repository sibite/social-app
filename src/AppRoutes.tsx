import { Navigate, Route, Routes } from 'react-router-dom';
import useIsAuthenticated from './hooks/useIsAuthenticated';
import ChatPage from './pages/chat/ChatPage';
import ErrorPage from './pages/ErrorPage';
import FeedPage from './pages/feed/FeedPage';
import LogInPage from './pages/log-in/LogInPage';
import ProfilePage from './pages/profile/ProfilePage';
import SearchPage from './pages/search/SearchPage';
import SettingsPage from './pages/settings/SettingsPage';
import SignUpPage from './pages/sign-up/SignUpPage';
import SinglePostPage from './pages/single-post/SinglePostPage';
import { useAppSelector } from './store/hooks';

const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const myId = useAppSelector((state) => state.auth.userId)!;

  return (
    <Routes>
      <Route path="/profile/:id/*" element={<ProfilePage />} />
      <Route path="/post/:id" element={<SinglePostPage />} />
      <Route path="/not-found" element={<ErrorPage status={404} />} />
      <Route path="/feed/*" element={<FeedPage />} />
      {isAuthenticated && (
        <>
          <Route path="*" element={<Navigate to="/feed" replace />} />
          <Route path="/search/:searchQuery" element={<SearchPage />} />
          <Route path="/messages/:id" element={<ChatPage />} />
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/profile" element={<Navigate to={myId} />} />
          <Route path="/settings" element={<SettingsPage />} />
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
