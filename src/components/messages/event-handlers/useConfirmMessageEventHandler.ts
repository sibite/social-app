import { useEffect } from 'react';
import useWebSocket from '../../../hooks/useWebSocket';
import publisher from '../../../shared/publisher';

const useConfirmMessageEventHandler = () => {
  const socket = useWebSocket();

  useEffect(() => {
    const confirmHandler = (ref: string, toId: string) => {
      publisher.emit('confirm-message', { ref, toId });
    };

    socket.on('confirm-message-sent', confirmHandler);

    return () => {
      socket.off('confirm-message-sent', confirmHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useConfirmMessageEventHandler;
