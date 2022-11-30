import { useEffect } from 'react';

function useKeyPress(
  code: KeyboardEvent['code'],
  callback: Function,
  fireInsideInput: boolean = false
) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (
        (['TEXTAREA', 'INPUT', 'SELECT'].indexOf(target?.nodeName) !== -1 ||
          target.isContentEditable) &&
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
