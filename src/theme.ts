import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import Avatar from './theme/Avatar';
import Button from './theme/Button';
import Card from './theme/Card';
import colors from './theme/colors';
import Link from './theme/Link';
import Textarea from './theme/Textarea';
import Tooltip from './theme/Tooltip';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  breakpoints: {
    xs: '25em',
  },
  config,
  colors,
  components: {
    Avatar,
    Button,
    Link,
    Card,
    Tooltip,
    Textarea,
  },
});

export default theme;
