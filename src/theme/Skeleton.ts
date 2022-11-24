import { cssVar, StyleConfig } from '@chakra-ui/react';

const $startColor = cssVar('skeleton-start-color');
const $endColor = cssVar('skeleton-end-color');

const Skeleton: StyleConfig = {
  baseStyle: ({ colorMode }) => ({
    [$startColor.variable]:
      colorMode === 'dark' ? 'colors.gray.600' : 'colors.gray.200',
    [$endColor.variable]:
      colorMode === 'dark' ? 'colors.gray.800' : 'colors.gray.400',
  }),
};

export default Skeleton;
