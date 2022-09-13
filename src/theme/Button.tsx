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
      return {};
    },
  },
};

export default Button;
