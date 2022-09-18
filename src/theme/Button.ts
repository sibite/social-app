import { StyleConfig } from '@chakra-ui/react';

const Button: StyleConfig = {
  variants: {
    solid: ({ colorScheme, colorMode }) => {
      if (colorScheme === 'gray') {
        const bg = colorMode === 'light' ? 'gray.100' : 'whiteAlpha.300';
        return {
          bg,
          _hover: {
            bg: colorMode === 'light' ? 'gray.200' : 'whiteAlpha.400',
            _disabled: {
              bg,
            },
          },
          _active: {
            bg: colorMode === 'light' ? 'gray.300' : 'whiteAlpha.500',
          },
        };
      }
      if (colorScheme === 'plainGray') {
        const bg = colorMode === 'light' ? 'gray.100' : 'gray.700';
        return {
          bg,
          _hover: {
            bg: colorMode === 'light' ? 'gray.200' : 'gray.600',
            _disabled: {
              bg,
            },
          },
          _active: {
            bg: colorMode === 'light' ? 'gray.300' : 'gray.500',
          },
        };
      }
      if (colorScheme === 'translucent') {
        const bg = colorMode === 'light' ? 'blackAlpha.600' : 'whiteAlpha.600';
        return {
          bg,
          _hover: {
            bg: colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.700',
            _disabled: {
              bg,
            },
          },
          _active: {
            bg: colorMode === 'light' ? 'blackAlpha.900' : 'whiteAlpha.900',
          },
        };
      }
      return {};
    },
  },
};

export default Button;
