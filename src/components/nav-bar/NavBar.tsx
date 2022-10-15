import {
  Box,
  Grid,
  useColorModeValue,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import NavBarAccount from './NavBarAccount';
import NavBarButtons from './NavBarButtons';
import NavBarSearch from './NavBarSearch';

const NavBar = forwardRef<HTMLDivElement>((_props, ref) => {
  const heightVal = 60;
  const height = `${heightVal}px`;
  const borderColor = useColorModeValue('gray.200', 'gray.800');

  const isMobile = useBreakpointValue({ base: true, md: false });

  const barStyle = {
    width: '100%',
    flexShrink: 0,
    boxSizing: 'content-box',
    zIndex: 1000,
    pointerEvents: 'auto',
    bgColor: useColorModeValue('white', 'black'),
    borderBottom: !isMobile ? '1px solid' : 'none',
    borderBottomColor: !isMobile ? borderColor : 'none',
    borderTop: isMobile ? '1px solid' : 'none',
    borderTopColor: isMobile ? borderColor : 'none',
  };

  const variant = useBreakpointValue({ base: 'flex', lg: 'grid' });

  const InnerJSX = (
    <>
      <NavBarSearch />
      <NavBarButtons />
      <NavBarAccount />
    </>
  );

  if (variant === 'grid')
    return (
      <Grid
        sx={barStyle}
        templateRows={height}
        templateColumns="repeat(3, 1fr)"
        ref={ref}
      >
        {InnerJSX}
      </Grid>
    );

  return (
    <Flex sx={barStyle} height={height} ref={ref} justify="space-between">
      {InnerJSX}
    </Flex>
  );
});

export default NavBar;
