import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import Avatar from './theme/Avatar';
import colors from './theme/colors';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  components: {
    Avatar,
  },
});

export default theme;
