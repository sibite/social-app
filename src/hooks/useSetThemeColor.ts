import { useColorModeValue, useToken } from '@chakra-ui/react';
import { useEffect } from 'react';

let globalColor: string;

const setThemeHeader = (value: string) => {
  const themeMetaEl = document.head.querySelector('meta[name="theme-color"]');
  themeMetaEl?.setAttribute('content', value);
};

const useSetThemeColor = (colorToken: string) => {
  const color = useToken('colors', colorToken);
  const defaultColor = useColorModeValue('#FFFFFF', '#000000');
  globalColor = color;

  useEffect(() => {
    setThemeHeader(globalColor);
    return () => setThemeHeader(defaultColor);
  }, [color, defaultColor]);
};

export default useSetThemeColor;
