import { useBreakpointValue as originalHook } from '@chakra-ui/react';

const useBreakpointValue: typeof originalHook = (
  values,
  arg = { ssr: false }
) =>
  originalHook(values, typeof arg === 'object' ? { ssr: false, ...arg } : arg);
export default useBreakpointValue;
