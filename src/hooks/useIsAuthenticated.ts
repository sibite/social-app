import { useAppSelector } from '../store/hooks';

const useIsAuthenticated = () => {
  const authState = useAppSelector((state) => state.auth);
  const isAuthenticated = authState.token && authState.userId;

  return isAuthenticated;
};

export default useIsAuthenticated;
