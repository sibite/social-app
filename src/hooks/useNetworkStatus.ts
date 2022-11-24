import { useBoolean } from '@chakra-ui/react';
import { useEffect } from 'react';

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useBoolean(navigator.onLine);

  useEffect(() => {
    window.addEventListener('offline', setIsOnline.off);
    window.addEventListener('online', setIsOnline.on);
    return () => {
      window.removeEventListener('offline', setIsOnline.off);
      window.removeEventListener('online', setIsOnline.on);
    };
  }, [setIsOnline.off, setIsOnline.on]);

  return isOnline;
};

export default useNetworkStatus;
