import { StyleConfig } from '@chakra-ui/react';

const Card: StyleConfig = {
  baseStyle: ({ colorMode }) => ({
    display: 'flex',
    flexDirection: 'column',
    background: colorMode === 'light' ? 'gray.50' : 'gray.800',
    alignItems: 'stretch',
    overflow: 'hidden',
  }),
  variants: {
    rounded: {
      borderRadius: 'lg',
      boxShadow: 'md',
    },
  },
  defaultProps: {
    variant: 'rounded',
  },
};

export default Card;
