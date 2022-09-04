import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import Avatar from './theme/Avatar';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: {
    Avatar,
  },
});

export default theme;
