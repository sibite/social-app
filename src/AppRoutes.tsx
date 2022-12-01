import { useColorModeValue } from '@chakra-ui/react';
import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import useIsAuthenticated from './hooks/useIsAuthenticated';
import useSetThemeColor from './hooks/useSetThemeColor';
import ErrorPage from './pages/ErrorPage';
import { useAppSelector } from './store/hooks';

const ChatPage = lazy(() => import('./pages/chat/ChatPage'));
const FeedPage = lazy(() => import('./pages/feed/FeedPage'));
const LogInPage = lazy(() => import('./pages/log-in/LogInPage'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage'));
const SearchPage = lazy(() => import('./pages/search/SearchPage'));
const SettingsPage = lazy(() => import('./pages/settings/SettingsPage'));
const SignUpPage = lazy(() => import('./pages/sign-up/SignUpPage'));
const SinglePostPage = lazy(() => import('./pages/single-post/SinglePostPage'));

const AppRoutes = () => {
  const isAuthenticated = useIsAuthenticated();
  const myId = useAppSelector((state) => state.auth.userId)!;
  useSetThemeColor(useColorModeValue('white', 'black'));

  return (
    <Routes>
      <Route element={<AppShell />}>
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
      </Route>
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
