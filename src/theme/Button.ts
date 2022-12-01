import { StyleConfig } from '@chakra-ui/react';

const Button: StyleConfig = {
  baseStyle: {},
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
        const color = colorMode === 'light' ? 'white' : 'black';
        return {
          bg,
          color,
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

      const c = colorScheme;
      const base = colorMode === 'light' ? 500 : 700;

      return {
        bg: `${c}.${base}`,
        color: 'white',
        _hover: {
          bg: `${c}.${base + 100}`,
          _disabled: {
            bg: `${c}.${base}`,
          },
        },
        _active: { bg: `${c}.${base + 200}` },
      };
    },
    ghost: ({ colorScheme, colorMode }) => {
      if (colorScheme === 'translucent') {
        const color = colorMode === 'light' ? 'white' : 'black';
        return {
          color,
        };
      }
      return {};
    },
  },
};

export default Button;
