import { StyleConfig } from '@chakra-ui/react';

const Card: StyleConfig = {
  baseStyle: ({ colorMode }) => ({
    display: 'flex',
    flexDirection: 'column',
    background: colorMode === 'light' ? 'white' : 'gray.800',
    alignItems: 'stretch',
    overflow: 'hidden',
  }),
  variants: {
    shaded: {
      borderRadius: 'lg',
      boxShadow: 'md',
    },
    flat: {
      borderRadius: 'lg',
    },
    unstyled: {
      display: 'block',
    },
  },
  defaultProps: {
    variant: 'shaded',
  },
};

export default Card;
