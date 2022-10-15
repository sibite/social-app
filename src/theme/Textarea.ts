import { StyleConfig } from '@chakra-ui/react';

const Textarea: StyleConfig = {
  baseStyle: {
    '&:focus-visible': {
      zIndex: 'auto !important',
    },
  },
};

export default Textarea;
