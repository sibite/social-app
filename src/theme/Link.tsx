import { StyleConfig } from '@chakra-ui/react';

const Link: StyleConfig = {
  baseStyle: ({ colorMode }) => ({
    color: colorMode === 'light' ? 'blue.500' : 'blue.300',
  }),
};

export default Link;
