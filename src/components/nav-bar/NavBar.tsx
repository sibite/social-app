import { Box, Grid, useColorModeValue } from '@chakra-ui/react';
import { forwardRef } from 'react';
import NavBarAccount from './NavBarAccount';
import NavBarButtons from './NavBarButtons';

const NavBar = forwardRef<HTMLDivElement>((_props, ref) => {
  const heightVal = 60;
  const height = `${heightVal}px`;

  const barStyle = {
    width: '100%',
    zIndex: 1000,
    pointerEvents: 'auto',
    bgColor: useColorModeValue('white', 'black'),
    borderBottom: '1px solid',
    borderBottomColor: useColorModeValue('gray.200', 'gray.800'),
  };

  return (
    <Grid
      sx={barStyle}
      templateRows={height}
      templateColumns="repeat(3, 1fr)"
      ref={ref}
    >
      <Box />
      <NavBarButtons />
      <NavBarAccount />
    </Grid>
  );
});

export default NavBar;
