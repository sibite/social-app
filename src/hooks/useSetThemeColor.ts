import { useColorModeValue, useToken } from '@chakra-ui/react';
import { useEffect } from 'react';

const setThemeHeader = (value: string) => {
  const themeMetaEl = document.head.querySelector('meta[name="theme-color"]');
  themeMetaEl?.setAttribute('content', value);
};

let currentId = 0;

const getId = () => {
  currentId += 1;
  return currentId - 1;
};

let colorStack: { id: number; value: string }[] = [];

const addColor = (id: number, color: string) => {
  colorStack.unshift({ id, value: color });
  colorStack.sort((a, b) => b.id - a.id);
};

const removeColor = (id: number) => {
  colorStack = colorStack.filter(({ id: curId }) => curId !== id);
};

const useSetThemeColor = (colorToken: string, shouldApply = true) => {
  const thisId = getId();
  const color = useToken('colors', colorToken);
  const defaultColor = useColorModeValue('#FFFFFF', '#000000');

  useEffect(() => {
    if (!shouldApply) return () => {};
    addColor(thisId, color);
    setThemeHeader(colorStack[0]?.value ?? defaultColor);
    return () => {
      removeColor(thisId);
      setThemeHeader(colorStack[0]?.value ?? defaultColor);
    };
  }, [shouldApply, color, thisId, defaultColor]);
};

export default useSetThemeColor;
