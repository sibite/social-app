import { StyleConfig } from '@chakra-ui/react';

const md = 10;
const xl3 = 40;

const Avatar: StyleConfig = {
  sizes: {
    md: {
      container: {
        width: md,
        height: md,
      },
      excessLabel: {
        width: md,
        height: md,
      },
      label: {
        lineHeight: 1,
        fontSize: md * 1.6,
      },
    },
    '3xl': {
      container: {
        width: xl3,
        height: xl3,
      },
      excessLabel: {
        width: xl3,
        height: xl3,
      },
      label: {
        lineHeight: 1,
        fontSize: xl3 * 1.6,
      },
    },
  },
  defaultProps: {
    size: 'md',
  },
};

export default Avatar;
