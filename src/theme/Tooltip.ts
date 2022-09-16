import { StyleConfig } from '@chakra-ui/react';

const Link: StyleConfig = {
  baseStyle: ({ colorMode }) => ({
    color: colorMode === 'dark' ? 'black' : 'white',
  }),
};

export default Link;
