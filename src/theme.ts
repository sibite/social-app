import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import Avatar from './theme/Avatar';
import Button from './theme/Button';
import Card from './theme/Card';
import colors from './theme/colors';
import Link from './theme/Link';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  components: {
    Avatar,
    Button,
    Link,
    Card,
  },
});

export default theme;
