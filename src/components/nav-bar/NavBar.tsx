import { Box, Grid, useColorModeValue } from '@chakra-ui/react';
import NavBarAccount from './NavBarAccount';
import NavBarButtons from './NavBarButtons';

interface Props {}

const NavBar: React.FC<Props> = () => {
  const heightVal = 60;
  const height = `${heightVal}px`;

  const barStyle = {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
    bgColor: useColorModeValue('white', 'black'),
    borderBottom: '1px solid',
    borderBottomColor: useColorModeValue('gray.200', 'gray.800'),
  };

  return (
    <>
      <Grid sx={barStyle} templateRows={height} templateColumns="1fr 992px 1fr">
        <Box />
        <NavBarButtons />
        <NavBarAccount />
      </Grid>
      <Box mb={height} />
    </>
  );
};

export default NavBar;
