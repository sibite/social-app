import { StyleConfig } from '@chakra-ui/react';

const AppCard: StyleConfig = {
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
    clickable: ({ colorMode }) => ({
      borderRadius: 'lg',
      boxShadow: 'sm',
      transition: 'all 120ms',
      '&:hover': {
        background: colorMode === 'light' ? 'gray.50' : 'gray.700',
        boxShadow: 'md',
      },
      '&:active': {
        background: colorMode === 'light' ? 'gray.200' : 'gray.600',
      },
    }),
    flat: {
      borderRadius: 'lg',
    },
    unstyled: {
      display: 'block',
      overflow: 'initial',
    },
  },
  defaultProps: {
    variant: 'shaded',
  },
};

export default AppCard;
