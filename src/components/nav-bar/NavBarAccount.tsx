import { Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { useGetAccountDataQuery } from '../../store/account-api';
import NavBarAccountPopover from './NavBarAccountPopover';
import ThemeToggle from './ThemeToggle';

interface Props {}

const NavBarAccount: React.FC<Props> = () => {
  const { data: user } = useGetAccountDataQuery();
  const isAuthenticated = useIsAuthenticated();

  return (
    <Flex direction="row-reverse" alignItems="center" pr={4} gap={4}>
      {user && <NavBarAccountPopover user={user} />}
      {!isAuthenticated && (
        <Button as={Link} to="/login" colorScheme="twitter">
          Log in
        </Button>
      )}
      <ThemeToggle />
    </Flex>
  );
};

export default NavBarAccount;
