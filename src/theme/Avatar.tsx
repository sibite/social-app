import type { ComponentStyleConfig } from '@chakra-ui/theme';

const md = 10;

const Avatar: ComponentStyleConfig = {
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
        fontSize: 16,
      },
    },
  },
  defaultProps: {
    size: 'md',
  },
};

export default Avatar;
