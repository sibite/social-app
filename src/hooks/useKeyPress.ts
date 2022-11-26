import { useEffect } from 'react';

function useKeyPress(
  code: KeyboardEvent['code'],
  callback: Function,
  fireInsideInput: boolean = false
) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (
        ['TEXTAREA', 'INPUT', 'SELECT'].indexOf(
          (event.target as HTMLElement).nodeName
        ) !== -1 &&
        !fireInsideInput
      )
        return;
      if (event.code === code) callback();
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [code, callback, fireInsideInput]);
}

export default useKeyPress;
