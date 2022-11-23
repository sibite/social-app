import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import Avatar from './theme/Avatar';
import Button from './theme/Button';
import AppCard from './theme/AppCard';
import colors from './theme/colors';
import Link from './theme/Link';
import Textarea from './theme/Textarea';
import Skeleton from './theme/Skeleton';
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
    AppCard,
    Tooltip,
    Textarea,
    Skeleton,
  },
});

export default theme;
