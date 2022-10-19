import { useBreakpointValue } from '@chakra-ui/react';

const useMobileModeValue = <T extends any>(mobile: T, desktop: T) =>
  useBreakpointValue({ base: mobile, md: desktop }) ?? desktop;

export default useMobileModeValue;
