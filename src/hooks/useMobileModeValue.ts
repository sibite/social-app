import useBreakpointValue from './wrappers/useBreakpointValue';

const useMobileModeValue = <T extends any>(mobile: T, desktop: T) =>
  useBreakpointValue({ base: mobile, md: desktop }) ?? desktop;

export default useMobileModeValue;
