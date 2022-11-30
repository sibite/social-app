import { useCallback, useLayoutEffect, useState } from 'react';

const lastScroll: { [key: number]: number } = {};

const getScrollDiff = (el: HTMLElement) => el.scrollTop;

const getBottomScroll = (el: HTMLElement) =>
  el.scrollHeight - el.scrollTop - el.clientHeight;

const restoreScroll = (el: HTMLElement, bottomScroll: number) => {
  el.scrollTo({
    top: el.scrollHeight - el.clientHeight - bottomScroll,
  });
};

const getUniqueId = (() => {
  let i = 0;
  return () => {
    i += 1;
    return i;
  };
})();

interface Options {
  elRef: React.RefObject<HTMLDivElement>;
  deps: any[];
  infiniteScrollCallback: Function;
  treshold: number;
  isComplete: boolean;
}

const useMessagesScroll = ({
  elRef,
  infiniteScrollCallback,
  treshold,
  isComplete,
  deps,
}: Options) => {
  const [id] = useState(getUniqueId());

  const scrollHandler = () => {
    const diff = getScrollDiff(elRef.current!);
    lastScroll[id] = getBottomScroll(elRef.current!);
    if (diff < treshold && !isComplete) {
      infiniteScrollCallback();
    }
  };

  const reset = () => {
    elRef.current!.scrollTo({
      top: elRef.current!.scrollHeight,
    });
    lastScroll[id] = 0;
  };

  const checkForScroll = useCallback(() => {
    restoreScroll(elRef.current!, lastScroll[id]);
    if (getScrollDiff(elRef.current!) < treshold) {
      infiniteScrollCallback();
    }
  }, [elRef, infiniteScrollCallback, treshold, id]);

  useLayoutEffect(() => {
    lastScroll[id] = 0;
  }, [id]);

  useLayoutEffect(() => {
    const diff = getScrollDiff(elRef.current!);
    if (diff < treshold || lastScroll[id] === 0)
      restoreScroll(elRef.current!, lastScroll[id]);

    checkForScroll();
    window.addEventListener('resize', checkForScroll);
    return () => {
      window.removeEventListener('resize', checkForScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkForScroll, elRef.current!, ...deps]);

  return { scrollHandler, reset };
};

export default useMessagesScroll;
