import { StyleConfig } from '@chakra-ui/react';

const Tooltip: StyleConfig = {
  baseStyle: ({ colorMode }) => ({
    color: colorMode === 'dark' ? 'black' : 'white',
  }),
};

export default Tooltip;
