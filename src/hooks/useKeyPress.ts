import { useEffect } from 'react';

function useKeyPress(code: KeyboardEvent['code'], callback: Function) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      // event.preventDefault();
      if (event.code === code) callback();
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [code, callback]);
}

export default useKeyPress;
