import { useEffect } from 'react';
import publisher from '../../shared/publisher';
import { useAppSelector } from '../../store/hooks';

const useOnMessageSent = (callback: Function) => {
  const myId = useAppSelector((state) => state.auth.userId);

  useEffect(() => {
    const newMessageHandler = () => {
      callback();
    };

    const subscription = publisher.on('message-sent', newMessageHandler);

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myId, callback]);
};

export default useOnMessageSent;
